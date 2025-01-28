import { pouzivatel } from "@prisma/client";
import { JwtPayload } from "jsonwebtoken";
import { getKnihy, getAutori, getZanre } from "./actions";

export interface Auth {
    pouzivatel: pouzivatel;
}

export interface AuthPayload extends JwtPayload {
    authData: Auth;
}


export interface Editable {
    editUrl: string,
    handleDelete: () => Promise<void>
}

export interface DetailUrl {
    detailUrl: string
}

export interface Actions {
    view: DetailUrl,
    edit?: Editable
}

export interface KnihaGroupedData extends Actions {
    type: "kniha",
    data: Awaited<ReturnType<typeof getKnihy>>[number]
}

export interface AutorGroupedData extends Actions {
    type: "autor",
    data: Awaited<ReturnType<typeof getAutori>>[number]
}

export interface ZanerGroupedData extends Actions {
    type: "zaner",
    data: Awaited<ReturnType<typeof getZanre>>[number]
}

export type EntityGroupedData = KnihaGroupedData | AutorGroupedData | ZanerGroupedData