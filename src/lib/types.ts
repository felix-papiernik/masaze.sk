import { pouzivatel } from "@prisma/client";
import { JwtPayload } from "jsonwebtoken";
import { getKnihy, getAutori, getZanre } from "./actions";

export interface Auth {
    pouzivatel: pouzivatel;
}

export interface AuthPayload extends JwtPayload {
    authData: Auth;
}

export interface KnihaGroupedData {
    type: "kniha",
    data: Awaited<ReturnType<typeof getKnihy>>[number]
}

export interface AutorGroupedData {
    type: "autor",
    data: Awaited<ReturnType<typeof getAutori>>[number]
}

export interface ZanerGroupedData {
    type: "zaner",
    data: Awaited<ReturnType<typeof getZanre>>[number]
}

export type EntityGroupedData = KnihaGroupedData | AutorGroupedData | ZanerGroupedData