export const runtime = 'edge';

import { NextResponse } from 'next/server';

export default async function GET() {

    //pripadne bez "edge"
    /*
    res.setHeader('Set-Cookie', 'auth_token=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Strict');
    res.status(200).json({ message: 'Logged out successfully' });
    */

    console.log("signout api");
    const response = NextResponse.json({ message: 'Logged out successfully' });

    // Vymaž cookies nastavením Max-Age na 0
    response.cookies.set('auth_token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        expires: new Date(0),
    });

    return response;
}
