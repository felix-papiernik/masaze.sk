'use server';

import { AuthError } from 'next-auth';
import { signIn } from '../../auth';
import dotenv from "dotenv";
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
