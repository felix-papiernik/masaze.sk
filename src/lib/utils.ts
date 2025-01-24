
import { jwtVerify } from "jose/jwt/verify";
import { EntityData, EntityDataPayload } from "./types";

// Funkcia na overenie JWT tokenu
export async function verifyToken(token: string, secret: string): Promise<EntityData> {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
    let edp = payload as EntityDataPayload;
    return edp.entityData;
}