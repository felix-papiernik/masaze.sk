'use server';

import dotenv from "dotenv";
import prisma from './prisma';
import { UpdateUserData, validateUpdateUserData } from './zod';
import { Role } from '@prisma/client';
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { EntityData, EntityDataPayload } from "./types";
import { revalidatePath } from "next/cache";
dotenv.config();

// require('dotenv').config();

export async function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
/*
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Nesprávne prihlasovacie údaje.';
        default:
          return 'Nastala chyba, skúste to znova.';
      }
    }
    throw error;
  }
}

export async function authenticateUsingFormData(
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      console.log("auth error", error);
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Nesprávne prihlasovacie údaje.';
        default:
          return 'Nastala chyba.' + error;
      }
    }
    throw error;
  }
}*/

/**
 * CRUD DELETE USER
 */
export async function deleteUser(
  id: number,
) {
  //console.log("server delete")
  let ret = {
    success: false,
    message: "",
  }

  try {
    await prisma.user.delete({
      where: {
        id: id,
      },
    });
    ret.success = true;
    ret.message = "Používateľ bol úspešne odstránený";
  } catch (error) {
    ret.message = "Nastala chyba pri odstraňovaní používateľa: " + error;
  }

  return ret;
}

/**
 * CRUD UPDATE USER
 */
export async function updateUser(
  id: number,
  updateUserData: UpdateUserData,
) {
  console.log("server update")
  let ret = {
    success: false,
    message: "",
  }

  if (validateUpdateUserData({
    firstName: updateUserData.firstName,
    lastName: updateUserData.lastName,
    email: updateUserData.email,
    phone: updateUserData.phone,
  }).error) {
    return {
      success: false,
      message: "Nesprávne údaje",
    }
  }

  try {
    await prisma.user.update({
      where: {
        id: id
      },
      data: {
        ...updateUserData
      }
    });
    ret.success = true;
    ret.message = "Používateľ bol úspešne aktualizovaný";
  } catch (error) {
    ret.message = "Nastala chyba pri úprave používateľa: " + error;
  }

  return ret;
}

/**
 * CRUD UPDATE USER
 */
export async function updateRole(
  id: number,
  role: Role
) {
  console.log("server update")
  let ret = {
    success: false,
    message: "",
  }

  if (role === undefined || !Object.keys(Role).some((v) => v === role)) {
    return {
      success: false,
      message: "Nesprávna rola",
    }
  }

  try {
    await prisma.user.update({
      where: {
        id: id
      },
      data: {
        role: role,
      }
    });
    ret.success = true;
    ret.message = "Používateľská rola bola úspešne aktualizovaná";
  } catch (error) {
    ret.message = "Nastala chyba pri úprave role: " + error;
  }

  return ret;
}

export const getEntityDataFromServerCookies = async (): Promise<EntityData | null> => {
  let ed: EntityData | null = null;
  // Načítanie údajov z HTTP-only cookies na serveri
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  if (token) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const { payload } = await jwtVerify(token, secret);
      let p = payload as EntityDataPayload; // Predpokladáme, že payload obsahuje údaje používateľa
      ed = p.entityData;
    } catch (err) {
      console.error("Invalid or expired token:", err);
    }
  }
  //console.log("returning EntityData from server cookies: ", ed)
  return ed;
}

export async function updateKlient(klientId: number, meno: string, priezvisko: string) {
  try {
    await prisma.klient.update({
      where: { id: klientId },
      data: { meno, priezvisko },
    });
    revalidatePath("/my-account");
    console.log("Klient successfully updated");
  } catch (error) {
    console.error("Failed to update klient:", error);
  }
}












import {  SignJWT } from "jose";
import { redirect } from "next/navigation"
import { Auth, AuthPayload } from "./types";

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

/*export async function createSession(auth: Auth) {
    const expires = new Date(Date.now() + 1000 * 60 * 60 * 6); // 6 hours
    //const session = await encrypt({ authData: auth, exp: expires.getTime() });
    const session = await encrypt({ authData: auth });
    const cookiesSet = await cookies();
    cookiesSet.set(cookieO.name, session, { ...cookies, expires });

    redirect("/u/dashboard");
}*/

export  const createSession = async (email: string, password: string) : Promise<Auth | null>=> {
  const klient = await prisma.klient.findUnique({ where: { email: email } });
    const maser = await prisma.maser.findUnique({ where: { email: email } });
    const maserstvo = await prisma.maserstvo.findUnique({ where: { login: email } });

    if (klient == null && maser == null && maserstvo == null) {
        return null;
    }
    
    const authData = {
        id: klient?.id || maser?.id || maserstvo?.id,
        entity: klient ? 'klient' : maser ? 'maser' : 'maserstvo',
        klient: !!klient,
        maser: !!maser,
        maserstvo: !!maserstvo,
    } as Auth;
  
  const expires = new Date(Date.now() + 1000 * 60 * 60 * 6); // 6 hours
  //const session = await encrypt({ authData: auth, exp: expires.getTime() });
  const session = await encrypt({ authData });
  const cookiesSet = await cookies();
  cookiesSet.set(cookieO.name, session, { ...cookies, expires });

  redirect("/u/dashboard");
}

export async function verifySession(): Promise<Auth | null> {
    const cookie = (await cookies()).get(cookieO.name)?.value;
    const session = await decrypt(cookie);

    if (!session) {
        console.log("!session redirecting to /prihlasenie")
        redirect("/prihlasenie");
    }

    return { ...session.authData };
}

export async function deleteSession() {
    (await cookies()).delete(cookieO.name);
    redirect("/prihlasenie");
}