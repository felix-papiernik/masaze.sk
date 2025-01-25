import { pouzivatel } from "@prisma/client";
import { JwtPayload } from "jsonwebtoken";

export type Entity = "klient" | "maser" | "maserstvo";

export interface EntityData {
    id: number;
    entity: Entity;
    klient: boolean;
    maser: boolean;
    maserstvo: boolean;
}

export interface Auth {
    pouzivatel: pouzivatel;
}

export interface EntityDataPayload extends JwtPayload {
    entityData: EntityData;
}

export interface AuthPayload extends JwtPayload {
    authData: Auth;
}