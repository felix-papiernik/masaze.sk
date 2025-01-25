import { pouzivatel } from "@prisma/client";
import { JwtPayload } from "jsonwebtoken";

export interface Auth {
    pouzivatel: pouzivatel;
}

export interface AuthPayload extends JwtPayload {
    authData: Auth;
}