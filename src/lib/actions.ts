'use server';

import { AuthError } from 'next-auth';
import { signIn } from '../../auth';
import dotenv from "dotenv";
import prisma from './prisma';
import { validateupdateUserData } from './zodValidations';
dotenv.config();

// require('dotenv').config();

export async function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

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
}

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
  firstName: string,
  lastName: string,
) {
  console.log("server update")
  let ret = {
    success: false,
    message: "",
  }

  if (validateupdateUserData({
    firstName,
    lastName
  }).error ) {
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
        firstName: firstName,
        lastName: lastName
      }
    });
    ret.success = true;
    ret.message = "Používateľ bol úspešne aktualizovaný";
  } catch (error) {
    ret.message = "Nastala chyba pri úprave používateľa: " + error;
  }

  return ret;
}
