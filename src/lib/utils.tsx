
// import { jwtVerify } from "jose/jwt/verify";

import { Abc, CollectionsBookmark, Group } from "@mui/icons-material";

// // Funkcia na overenie JWT tokenu
// export async function verifyToken(token: string, secret: string): Promise<EntityData> {
//     const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
//     let edp = payload as EntityDataPayload;
//     return edp.entityData;
// }

export const redirectUrlAfterLogin = (isAdmin: boolean): string => {
    return isAdmin ? "/u/admin/knihy" : "/u/moje-knihy";
}

export const getUrls = () => {
    return (
        {
            knihy: "/knihy",
            autori: "/autori",
            zanre: "/zanre",
            u: {
                mojUcet: "/u/moj-ucet",
                mojeKnihy: "/u/moje-knihy"
            }
        }
    )
}

export const getAdminLinks = () => [
    { href: "/u/admin/knihy", label: "Knihy", icon: <CollectionsBookmark /> },
    { href: "/u/admin/autori", label: "Autori", icon: <Group /> },
    { href: "/u/admin/zanre", label: "Žánre", icon: <Abc /> },
]