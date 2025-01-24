import { User } from "@prisma/client";
import { jwtDecrypt, jwtVerify } from "jose";
//import { cookies } from "next/headers";



/*
export const getUserFromLocalCookies = () => {
    let user: User | null = null;
    // Načítanie údajov z HTTP-only cookies na serveri
    const cookie = document.cookie
        .split("; ")
        .find((row) => row.startsWith("auth_token="))
        ?.split("=")[1];

    if (!cookie) return null;

    try {
        const user = jwtDecrypt<User | null>(cookie, new TextEncoder().encode(process.env.JWT_SECRET as string));
        return user;
    } catch (err) {
        console.error("Failed to decode token:", err);
        return null;
    }
    return user;
}*/