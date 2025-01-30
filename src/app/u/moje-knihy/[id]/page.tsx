"use server";

import { getPouzivateloveKnihy } from "@/lib/actions";
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
            <Typography variant="h5">Stav knihy {pouzivatelovaKniha.stav}</Typography>
            <Typography variant="h5">Poznámka: {pouzivatelovaKniha.poznamka}</Typography>
        </>
            : <Typography variant="h1">Používateľova kniha neexistuje</Typography>
    )

    // return (
    //     data ?
    //         <Box component={"form"} action={updateKniha}>
    //             <Typography variant="h1">{data?.nazov}</Typography>
    //             <TextField name="pocet_stran" label="Počet strán" defaultValue={data?.pocet_stran} />
    //             <Typography variant="body1">Počet strán: {data?.pocet_stran}</Typography>
    //             <Typography variant="body1">Autor: {data?.autor.meno} {data?.autor.priezvisko}</Typography>
    //             <Button type="submit" variant="contained">Aktualizovať knihu</Button>
    //         </Box> : <Typography variant="h1">Kniha neexistuje</Typography>
    // )
}
