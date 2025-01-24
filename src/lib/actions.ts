'use server';

import dotenv from "dotenv";
import prisma from './prisma';
import { UpdateUserData, validateUpdateUserData } from './zod';
import { Role } from '@prisma/client';
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { EntityData, EntityDataPayload } from "./types";
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

export const getEntityDataFromServerCookies = async () : Promise<EntityData | null> => {
  let ed: EntityData | null = null;
  // Načítanie údajov z HTTP-only cookies na serveri
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

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