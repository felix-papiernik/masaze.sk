// /pages/api/login.js
import prisma from '@/lib/prisma';
import { EntityData, EntityDataPayload } from '@/lib/types';
import { User } from '@prisma/client';
import { serialize } from 'cookie';
import { SignJWT } from 'jose/jwt/sign';
import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import { revalidatePath } from 'next/cache';

interface LoginRequest extends NextApiRequest {
    body: {
        email: string;
        password: string;
    };
}

interface ErrorResponse {
    error: string;
}

interface SuccessResponse {
    entity: EntityData;
}

export default async function handler(req: LoginRequest, res: NextApiResponse<SuccessResponse | ErrorResponse>) {
    const { email, password } = req.body;

    //todo password compare


    const klient = await prisma.klient.findUnique({ where: { email: email } });
    const maser = await prisma.maser.findUnique({ where: { email: email } });
    const maserstvo = await prisma.maserstvo.findUnique({ where: { login: email } });

    if (klient == null && maser == null && maserstvo == null) {
        return res.status(401).json({ error: 'Neplatné prihlasovacie údaje' });
    }
    const entityData = {
        id: klient?.id || maser?.id || maserstvo?.id,
        entity: klient ? 'klient' : maser ? 'maser' : 'maserstvo',
        klient: !!klient,
        maser: !!maser,
        maserstvo: !!maserstvo,
    } as EntityData;

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    // Vytvor JWT token
    const token = await new SignJWT({ entityData } as EntityDataPayload) // Payload tokenu
        .setProtectedHeader({ alg: 'HS256' }) // Algoritmus na podpisovanie
        .setIssuedAt() // Nastavenie času vydania
        .setExpirationTime('1d') // Nastavenie expiračného času (1 deň)
        .sign(secret);

    // Nastavenie cookies s tokenom
    const cookie = serialize('auth_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 60 * 24, // 1 deň
    });

    res.setHeader('Set-Cookie', cookie);
    res.status(200).json({ entity: entityData });
    console.log("returing entity data: ", entityData);
}
