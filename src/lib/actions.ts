'use server';

import prisma from './prisma';
import { pouzivatel, Prisma } from '@prisma/client';
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { SignJWT } from "jose";
import { redirect } from "next/navigation"
import { Auth, AuthPayload } from "./types";
//dotenv.config();

// require('dotenv').config();

export async function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


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
  // return auth;
  //redirect("/u/dashboard");
}

// export const updateCookiesAuth = async (auth: Auth): Promise<Auth | null> => {
//   let a = await createSession(auth);
//   return a;
// }

export async function verifySession(): Promise<Auth | null> {
  const cookie = (await cookies()).get(cookieO.name)?.value;
  const session = await decrypt(cookie);

  if (!session) {
    console.log("!session redirecting to /prihlasenie")
    return null;
  }

  return { ...session.authData };
}

export async function deleteSession() {
  (await cookies()).delete(cookieO.name);
  redirect("/prihlasenie");
}



export interface ErrorResponse {
  error: string;
}

export async function validateLogin({ email, password }: { email: string, password: string }): Promise<pouzivatel | ErrorResponse> {
  let pouzivatel = await prisma.pouzivatel.findUnique({
    where: {
      email: email,
    }
  });
  if (pouzivatel === null) {
    return { error: "Používateľ neexistuje" };
  } else if (pouzivatel.hash_heslo !== password) {//TODO: hash hesla
    return { error: "Nesprávne heslo" };
  }

  return pouzivatel;
}




// export const getEntityDataFromServerCookies = async (): Promise<EntityData | null> => {
//   let ed: EntityData | null = null;
//   // Načítanie údajov z HTTP-only cookies na serveri
//   const cookieStore = await cookies();
//   const token = cookieStore.get("session")?.value;

//   if (token) {
//     try {
//       const secret = new TextEncoder().encode(process.env.JWT_SECRET);
//       const { payload } = await jwtVerify(token, secret);
//       let p = payload as EntityDataPayload; // Predpokladáme, že payload obsahuje údaje používateľa
//       ed = p.entityData;
//     } catch (err) {
//       console.error("Invalid or expired token:", err);
//     }
//   }
//   //console.log("returning EntityData from server cookies: ", ed)
//   return ed;
// }

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
    let pouzivatelCreate = await prisma.pouzivatel.create({
      data: {
        meno: createPouzivatelData.meno,
        priezvisko: createPouzivatelData.priezvisko,
        email: createPouzivatelData.email,
        hash_heslo: createPouzivatelData.heslo,
        je_admin: false
      }
    })
    return pouzivatelCreate;
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      if (e.code === 'P2002') {
        console.log(
          'There is a unique constraint violation, a new user cannot be created with this email'
        )
      }
      return { error: e.code === 'P2002' ? 'Používateľ s týmto email už existuje' : 'Neznáma chyba' };
    }
    return { error: 'Neznáma chyba' };
  }
}