import { User } from "@prisma/client";
import { JwtPayload } from "jsonwebtoken";

export interface UserTokenPayload extends JwtPayload {
    user: User;
}

export type Entity = "klient" | "maser" | "maserstvo";

export interface EntityData {
    id: number;
    entity: Entity;
}

export interface EntityDataPayload extends JwtPayload {
    entityData: EntityData;
}