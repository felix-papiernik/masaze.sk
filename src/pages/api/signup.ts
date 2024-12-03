"use server";

import { delay } from '@/lib/actions';
import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { User } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

import bcrypt from 'bcrypt';
import dotenv from "dotenv";
import { CreateUserData, validateCreateUserData } from '@/lib/zodValidations';
dotenv.config();

export type Response = {
    ok: boolean;
    message?: string;
    data?: CreateUserData;
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

        const parsedUser = validateCreateUserData(userObject);

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
