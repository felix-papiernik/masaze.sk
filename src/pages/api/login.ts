// /pages/api/login.js
import prisma from '@/lib/prisma';
import { UserTokenPayload } from '@/schema/TokenPayload';
import { User } from '@prisma/client';
import { serialize } from 'cookie';
import { SignJWT } from 'jose/jwt/sign';
import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

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
    user: User;
}

export default async function handler(req: LoginRequest, res: NextApiResponse<SuccessResponse | ErrorResponse>) {
    const { email, password } = req.body;

    // Simulované overenie (napr. cez databázu) TODO
    if (email === 'felixpapiernik42@gmail.com' && password === 'heslo123') {
        const user = await prisma.user.findUnique({ where: { email: email } });
        if (!user) {
            return res.status(401).json({ error: 'Neplatné prihlasovacie údaje' });
        }
        //const token = jwt.sign(user, process.env.JWT_SECRET as string, { expiresIn: '1d' });
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        // Vytvor JWT token
        const token = await new SignJWT(user as User) // Payload tokenu
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


        res.status(200).json({ user: user }); // Dáta pre Context
    } else {
        res.status(401).json({ error: 'Neplatné prihlasovacie údaje' });
    }
}
