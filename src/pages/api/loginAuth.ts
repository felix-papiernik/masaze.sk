"use server";

import { createSession } from '@/lib/actions';
import prisma from '@/lib/prisma';
import { Auth } from '@/lib/types';
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
    auth: Auth;
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
    
    const authData = {
        id: klient?.id || maser?.id || maserstvo?.id,
        entity: klient ? 'klient' : maser ? 'maser' : 'maserstvo',
        klient: !!klient,
        maser: !!maser,
        maserstvo: !!maserstvo,
    } as Auth;

    console.log("creating session with auth data: ", authData);
    createSession(email, password);
    res.status(200).json({ auth: authData });
    console.log("returing auth data: ", authData);
}