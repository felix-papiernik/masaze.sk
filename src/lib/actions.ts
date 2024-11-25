'use server';

import { AuthError } from 'next-auth';
import { signIn } from '../../auth';
import { PrismaClient, Role } from '@prisma/client';
import { z } from 'zod';

require('dotenv').config();
const prisma = new PrismaClient();


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
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}


function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


export async function signUp(
  prevState: Record<string, string> | undefined,
  formData: FormData,
) {
  try {
    await delay(1000);

    const userData = {
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      password: formData.get('password') as string,
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
    };



    // Validate user input using Zod
    const parsedUser = z.object({
      email: z.string().email("Zadajte platný email"),
      phone: z.string()
        .min(10, "Tel.číslo musí mať aspoň 10 znakov")
        .max(13, "Tel.číslo musí mať maximálne 13 znakov"),
      password: z.string().min(8, "Heslo musí mať aspoň 8 znakov"),
      firstName: z.string().min(1, "Meno je povinné"),
      lastName: z.string().min(1, "Priezvisko je povinné"),
    }).safeParse(userData);

    if (!parsedUser.success) {
      // Map Zod errors to fields
      let errors: Record<string, string> = {};
      parsedUser.error.errors.forEach((err) => {
        if (err.path[0]) {
          errors[err.path[0]] = err.message;
        }
      });
      return errors;
    }

    const bcrypt = require('bcrypt');
    const hashedPassword = await bcrypt.hash(parsedUser.data.password, parseInt(process.env.HASH!));

    // Create user in Prisma
    const user = await prisma.user.create({
      data: {
        email: parsedUser.data.email,
        phone: parsedUser.data.phone,
        firstName: parsedUser.data.firstName,
        lastName: parsedUser.data.lastName,
        password: hashedPassword,
        role: Role.CLIENT, // Default role
      },
    });

    if (!user) {
      return "Nepodarilo sa vytvoriť používateľa";
    }

    return {}; // No errors mean success
  } catch (error) {
    console.error("Sign-up error:", error);
    return "Došlo k chybe pri registrácii. Skúste znova.";
  }
}