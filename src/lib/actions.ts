'use server';

import prisma from './prisma';
import { autor, kniha, pouzivatel, Prisma, stav, zaner } from '@prisma/client';
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { SignJWT } from "jose";
import { redirect } from "next/navigation"
import { Auth, AuthPayload } from "./types";

import bcrypt from 'bcryptjs';
import { revalidatePath } from 'next/cache';

export async function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * funkcie pre prácu s cookies su založené na príklade z https://www.youtube.com/watch?v=N_sUsq_y10U&t=1s
 */
const secret = new TextEncoder().encode(process.env.JWT_SECRET);

const cookieO = {
  name: 'session',
  options: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    sameSite: 'strict',
  },
  duration: 60 * 60 * 6, // 6 hours
}

export async function encrypt(payload: AuthPayload) {
  return new SignJWT(payload) // Payload tokenu
    .setProtectedHeader({ alg: 'HS256' }) // Algoritmus na podpisovanie
    .setIssuedAt() // Nastavenie času vydania
    .setExpirationTime('6h') // Nastavenie expiračného času (6h) alebo "1d"
    .sign(secret);
}

export async function decrypt(session: any): Promise<AuthPayload | null> {
  try {
    const { payload } = await jwtVerify(session, secret, { algorithms: ['HS256'] });
    return payload as AuthPayload;
  } catch (error) {
    return null;
  }
}

const expires = new Date(Date.now() + 1000 * 60 * 60 * 6); // 6 hours

export const createSession = async (auth: Auth) => {
  //const session = await encrypt({ authData: auth, exp: expires.getTime() });
  const session = await encrypt({ authData: auth });
  const cookiesSet = await cookies();
  cookiesSet.set(cookieO.name, session, { ...cookies, expires });
}


export async function verifySession(): Promise<Auth | null> {
  const cookie = (await cookies()).get(cookieO.name)?.value;
  const session = await decrypt(cookie);

  if (!session) {
    //console.log("!session redirecting to /prihlasenie")
    return null;
  }

  return { ...session.authData };
}

export async function deleteSession(redirectToPrihlasenie?: boolean) {
  (await cookies()).delete(cookieO.name);
  redirectToPrihlasenie && redirect("/prihlasenie");
}





export interface ErrorResponse {
  error: string;
}

export async function tryToLogin({ email, password }: { email: string, password: string }): Promise<pouzivatel | ErrorResponse> {
  let pouzivatel = await prisma.pouzivatel.findUnique({
    where: {
      email: email,
    }
  });

  if (pouzivatel === null) {
    return { error: "Používateľ neexistuje" };
  }
  const passwordMatch = bcrypt.compareSync(password, pouzivatel.hash_heslo);
  return passwordMatch ? pouzivatel : { error: "Nesprávne heslo" };
}


export const getAuthFromCookies = async (): Promise<Auth | null> => {
  // Načítanie údajov z HTTP-only cookies na serveri
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  const payload = await decrypt(token);
  //console.log("returning EntityData from server cookies: ", ed)
  return payload?.authData || null;
}

export const updatePouzivatel = async (pouzivatel: pouzivatel): Promise<pouzivatel> => {
  let pouzivatelUpdate = await prisma.pouzivatel.update({
    where: {
      id: pouzivatel.id
    },
    data: {
      meno: pouzivatel.meno,
      priezvisko: pouzivatel.priezvisko,
      email: pouzivatel.email,
      hash_heslo: pouzivatel.hash_heslo,
      je_admin: pouzivatel.je_admin,
    }
  })
  return pouzivatelUpdate;
}
interface CreatePouzivatelData {
  meno: string,
  priezvisko: string,
  email: string,
  heslo: string,
}
export const createPouzivatel = async (createPouzivatelData: CreatePouzivatelData): Promise<pouzivatel | ErrorResponse> => {
  try {
    const hashedPassword = await bcrypt.hash(createPouzivatelData.heslo, 10);
    let pouzivatelCreate = await prisma.pouzivatel.create({
      data: {
        meno: createPouzivatelData.meno,
        priezvisko: createPouzivatelData.priezvisko,
        email: createPouzivatelData.email,
        hash_heslo: hashedPassword,
        je_admin: false
      }
    })
    return pouzivatelCreate;
  } catch (e) {
    return {
      error: e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002'
        ? 'Používateľ s týmto email už existuje' : 'Chyba pri vytváraní používateľa' + e,
    }
  }
}

export const getKnihy = async (autor_id?: number) => {
  return await prisma.kniha.findMany({
    where: { autor_id: autor_id },
    include: { autor: true, zaner: true }
  });
}

export const getPouzivateloveKnihy = async (pouzivatel_id: number) => {
  return await prisma.kniha_pouzivatel.findMany({
    where: { pouzivatel_id: pouzivatel_id },
    include: {
      kniha: {
        include: { autor: true, zaner: true }
      },
      pouzivatel: true
    },
  });
}

export interface EntityResponse {
  error?: string;
  returnValue?: any;
}
export const insertPouzivatelovaKniha = async (pouzivatelovaKniha: {
  kniha_id: number, pouzivatel_id: number, stav: stav, poznamka: string
}): Promise<EntityResponse> => {
  try {
    const d = await prisma.kniha_pouzivatel.create({
      data: {
        kniha_id: pouzivatelovaKniha.kniha_id,
        pouzivatel_id: pouzivatelovaKniha.pouzivatel_id,
        stav: pouzivatelovaKniha.stav as stav,
        poznamka: pouzivatelovaKniha.poznamka
      }
    });
    return { returnValue: d };
  } catch (e) {
    return { error: e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002' ? "Kniha sa už v zozname nachádza" : "Chyba" };
  }
}

export async function deletePouzivatelovaKniha(id: number) {
  try {
    await prisma.kniha_pouzivatel.delete({
      where: {
        id: id
      }
    })
    revalidatePath("/u/moje-knihy");
  } catch (e) {
    return
  }
}



export const getAutori = async () => {
  return await prisma.autor.findMany({
    include: {
      _count: {
        select: {
          kniha: true
        }
      }
    }
  });
}

export const getZanre = async () => {
  return await prisma.zaner.findMany({
    include: {
      _count: {
        select: {
          kniha: true
        }
      }
    }
  });
}

export const deletePouzivatel = async (id: number) => {
  try {
    await prisma.pouzivatel.delete({
      where: {
        id: id
      }
    })
    return true;
  } catch (e) {
    return false;
  }
}

export const deleteKniha = async (knihaId: number) => {
  await prisma.kniha.delete({
    where: {
      id: knihaId
    }
  });
}

export interface UpsertKnihaResponse {
  kniha: kniha | null;
  error?: string;
}

export const createKniha = async (kniha: kniha): Promise<UpsertKnihaResponse> => {
  try {
    const k = await prisma.kniha.create({
      data: kniha
    });
    return { kniha: k };
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return { error: e.code === 'P2002' ? 'Kniha s týmto názvom už existuje' : 'Neznáma chyba' + e.message, kniha: null };
    }
    return { error: 'Neznáma chyba' + e, kniha: null };
  }
}

export const updateKniha = async (kniha: kniha): Promise<UpsertKnihaResponse> => {
  try {
    const updatedKniha = await prisma.kniha.update({
      where: { id: kniha.id },
      data: kniha
    });
    return { kniha: updatedKniha };
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return { error: e.code === 'P2002' ? 'Kniha s týmto názvom už existuje' : 'Neznáma chyba' + e.message, kniha: null };
    }
    return { error: 'Neznáma chyba' + e, kniha: null };
  }
}

export interface UpsertAutorResponse {
  autor: autor | null;
  error?: string;
}
const existingAutorMessage = 'Autor s týmto menom a priezviskom už existuje';
export const createAutor = async (autor: autor): Promise<UpsertAutorResponse> => {
  try {
    const a = await prisma.autor.create({
      data: autor
    });
    return { autor: a };
  } catch (e) {
    return {
      error: e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002'
        ? existingAutorMessage : 'Chyba pri aktualizovaní zanera' + e,
      autor: null
    };
  }
}

export const updateAutor = async (autor: autor): Promise<UpsertAutorResponse> => {
  try {
    const updatedAutor = await prisma.autor.update({
      where: { id: autor.id },
      data: autor
    });
    return { autor: updatedAutor };
  } catch (e) {
    return {
      error: e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002'
        ? existingAutorMessage : 'Chyba pri aktualizovaní zanera' + e,
      autor: null
    };
  }
}

export interface UpsertZanerResponse {
  zaner: zaner | null;
  error?: string;
}
const existingZanerMessage = 'Žáner s týmto názvom už existuje';
export const createZaner = async (zaner: zaner): Promise<UpsertZanerResponse> => {
  try {
    const a = await prisma.zaner.create({
      data: zaner
    });
    return { zaner: a };
  } catch (e) {
    return {
      error: e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002'
        ? existingZanerMessage : 'Chyba pri aktualizovaní zanera' + e,
      zaner: null
    };
  }
}

export const updateZaner = async (zaner: zaner): Promise<UpsertZanerResponse> => {
  try {
    const updatedzaner = await prisma.zaner.update({
      where: { id: zaner.id },
      data: zaner
    });
    return { zaner: updatedzaner };
  } catch (e) {
    return {
      error: e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002'
        ? existingZanerMessage : 'Chyba pri aktualizovaní zanera' + e,
      zaner: null
    };
  }
}