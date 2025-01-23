import { UserTokenPayload } from "@/schema/TokenPayload";
import { jwtVerify } from "jose/jwt/verify";



// Funkcia na overenie JWT tokenu
export async function verifyToken(token: string, secret: string): Promise<UserTokenPayload> {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
    return payload as UserTokenPayload;
}