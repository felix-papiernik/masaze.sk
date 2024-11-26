"use server";

import { delay } from '@/lib/actions';
import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { User } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

export type Response = {
    ok: boolean;
    message?: string;
    data?: any;
    error?: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Response>
) {
    console.log("api runs")
    if (req.method !== 'POST') {
        return res.status(405).json({ ok: false, message: 'Method not allowed' });
    }

    try {
        await delay(1000);

        type CreateUserData = Pick<User, "email" | "phone" | "firstName" | "lastName" | "password">;
        const userData: CreateUserData = req.body;
        // console.log("typeof req.body", typeof req.body);

        console.log("userData", userData);
        const userObject = {
            email: userData.email,
            phone: userData.phone,
            password: userData.password,
            firstName: userData.firstName,
            lastName: userData.lastName
        }

        console.log("userObject", userObject);

        const parsedUser = z.object({
            email: z.string().min(1, "Email je povinný").email("Nesprávny formát emailu"),
            phone: z.string()
                .min(10, "Tel.číslo musí mať aspoň 10 znakov")
                .max(13, "Tel.číslo musí mať maximálne 13 znakov"),
            password: z.string().min(8, "Heslo musí mať aspoň 8 znakov"),
            firstName: z.string().min(1, "Krstné meno je povinné"),
            lastName: z.string().min(1, "Priezvisko je povinné"),
        }).safeParse(userObject);

        if (!parsedUser.success) {
            // const errors: Record<string, string[]> = {};
            // parsedUser.error.errors.forEach((err) => {
            //     const key = err.path[0];
            //     if (key) {
            //         if (!errors[key]) {
            //             errors[key] = [];
            //         }
            //         errors[key].push(err.message);
            //     }
            // });
            // console.log(errors)

            return res.status(400).json({
                ok: false,
                error: parsedUser.error.errors[0].message,
            });
        }

        const bcrypt = require('bcrypt');
        require('dotenv').config();
        const hashedPassword = await bcrypt.hash(userData.password, parseInt(process.env.HASH!));
        const user = await prisma.user.create({
            data: {
                ...userData,
                password: hashedPassword
            }
        });
        return res.status(200).json({
            ok: true,
            message: "Používateľ bol úspešne vytvorený",
            data: user
        });

    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            switch (error.code) {
                case 'P2002':
                    return res.status(400).json({ ok: false, error: "Používateľ s týmto emailom už existuje" });
            }
        }
        return res.status(500).json({ ok: false, error: "Nastala neočakávaná chyba" + error });
    }
}
