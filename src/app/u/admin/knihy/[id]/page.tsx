"use server";

import { verifySession } from '@/lib/actions';
import prisma from '@/lib/prisma';
import { Box, Button, TextField, Typography } from '@mui/material';
import { revalidatePath } from 'next/cache';
import React from 'react'
import KnihaForm from '../KnihaForm';

export default async function Page({ params }
    : { params: Promise<{ id: number }> }
) {
    const id = parseInt((await params).id.toString());
    const kniha = await prisma.kniha.findUnique({
        where: {
            id: id
        }
    })
    const autori = await prisma.autor.findMany()
    const zanre = await prisma.zaner.findMany()

    return (
        kniha && autori && zanre ?
            <KnihaForm autori={autori} zanre={zanre} knihaToUpdate={kniha} />
            : <Typography variant="h1">Kniha neexistuje</Typography>
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
