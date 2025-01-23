import { User } from "@prisma/client";
import { jwtDecrypt, jwtVerify } from "jose";
import { cookies } from "next/headers";

export const getUserFromServerCookies = async () => {
    console.log("getting cookies from server...")
    let user: User | null = null;
    // Načítanie údajov z HTTP-only cookies na serveri
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (token) {
        try {
            const secret = new TextEncoder().encode(process.env.JWT_SECRET);
            const { payload } = await jwtVerify(token, secret);
            user = payload as User; // Predpokladáme, že payload obsahuje údaje používateľa
        } catch (err) {
            console.error("Invalid or expired token:", err);
        }
    }
    console.log("returning user from server cookies: ", user)
    return user;
}

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