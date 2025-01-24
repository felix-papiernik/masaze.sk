"server only";

import { jwtVerify, SignJWT } from "jose";
import { redirect } from "next/navigation"
import { Auth, AuthPayload } from "./types";
import { cookies } from "next/headers";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

const cookieO = {
    name: 'session',
    options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        sameSite: 'strict',
    },
    duration: 60 * 60 * 6, // 6 hours
}

export async function encrypt(payload: AuthPayload) {
    return new SignJWT(payload) // Payload tokenu
        .setProtectedHeader({ alg: 'HS256' }) // Algoritmus na podpisovanie
        .setIssuedAt() // Nastavenie času vydania
        .setExpirationTime('6h') // Nastavenie expiračného času (6h) alebo "1d"
        .sign(secret);
}

export async function decrypt(session: any): Promise<AuthPayload | null> {
    try {
        const { payload } = await jwtVerify(session, secret, { algorithms: ['HS256'] });
        return payload as AuthPayload;
    } catch (error) {
        return null;
    }
}

export async function createSession(auth: Auth) {
    const expires = new Date(Date.now() + 1000 * 60 * 60 * 6); // 6 hours
    //const session = await encrypt({ authData: auth, exp: expires.getTime() });
    const session = await encrypt({ authData: auth });
    const cookiesSet = await cookies();
    cookiesSet.set(cookieO.name, session, { ...cookies, expires });

    redirect("/u/dashboard");
}

export async function verifySession(): Promise<Auth | null> {
    const cookie = (await cookies()).get(cookieO.name)?.value;
    const session = await decrypt(cookie);

    if (!session) {
        console.log("!session redirecting to /prihlasenie")
        redirect("/prihlasenie");
    }

    return { ...session.authData };
}

export async function deleteSession() {
    (await cookies()).delete(cookieO.name);
    redirect("/prihlasenie");
}