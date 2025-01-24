import { JwtPayload } from "jsonwebtoken";

export type Entity = "klient" | "maser" | "maserstvo";

export interface EntityData {
    id: number;
    entity: Entity;
    klient: boolean;
    maser: boolean;
    maserstvo: boolean;
}

export interface EntityDataPayload extends JwtPayload {
    entityData: EntityData;
}