"use server";

import prisma from "@/lib/prisma";
import { Typography } from "@mui/material";

export default async function Page({ params }
    : { params: Promise<{ id: number }> }
) {
    const id = parseInt((await params).id.toString());
    const pouzivatelovaKniha = await prisma.kniha_pouzivatel.findUnique({
        where: {
            id: id
        },
        include: {
            kniha: {
                include: {
                    autor: true,
                    zaner: true
                }
            }
        }
    });

    return (
        pouzivatelovaKniha ? <>
            <Typography variant="h1">{pouzivatelovaKniha.kniha.nazov}</Typography>
            <Typography variant="h5">Stav knihy: {pouzivatelovaKniha.stav === "chcemPrecitat" ? "na prečítanie" : "prečítané"}</Typography>
            <Typography variant="h5">Poznámka: {pouzivatelovaKniha.poznamka || "Bez poznámky"}</Typography>
        </>
            : <Typography variant="h1">Používateľova kniha neexistuje</Typography>
    )
}
