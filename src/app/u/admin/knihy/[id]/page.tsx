"use server";

import { verifySession } from '@/lib/actions';
import prisma from '@/lib/prisma';
import { Box, Button, TextField, Typography } from '@mui/material';
import { revalidatePath } from 'next/cache';
import React from 'react'

export default async function Page({ params }
    : { params: Promise<{ id: number }> }
) {
    const id = (await params).id;
    console.log(id)

    const data = await prisma.kniha.findUnique({
        where: {
            id: id
        },
        include: {
            autor: true
        }
    })

    async function updateKniha(formData: FormData ) {
        "use server";
        await prisma.kniha.update({
            where: {
                id: id
            },
            data: {
                pocet_stran: data?.pocet_stran ? data.pocet_stran + 1 : 0
            }
        })
        revalidatePath("/u/admin/knihy/" + id)
    }

    return (
        data ?
            <Box component={"form"} action={updateKniha}>
                <Typography variant="h1">{data?.nazov}</Typography>
                <TextField name="pocet_stran" label="Počet strán" defaultValue={data?.pocet_stran} />
                <Typography variant="body1">Počet strán: {data?.pocet_stran}</Typography>
                <Typography variant="body1">Autor: {data?.autor.meno} {data?.autor.priezvisko}</Typography>
                <Button type="submit" variant="contained">Aktualizovať knihu</Button>
            </Box> : <Typography variant="h1">Kniha neexistuje</Typography>
    )
}
