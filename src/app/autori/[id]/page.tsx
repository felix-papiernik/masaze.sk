import prisma from '@/lib/prisma';
import { Typography } from '@mui/material';
import React from 'react'

export default async function Page({ params }
    : { params: Promise<{ id: string }> }
) {
    const id = parseInt((await params).id);
    console.log(id)

    const data = await prisma.autor.findUnique({
        where: {
            id: id
        }
    })

    return (
        data ? <>
            <Typography variant="h1">{data?.meno} {data?.priezvisko}</Typography>
            <Typography variant="h3">O autorovi</Typography>
            <Typography variant="body1">Dátum narodenia: {data?.datum_nar}</Typography>
            <Typography variant="body1">Popis: {data?.info}</Typography>
        </> : <Typography variant="h1" color='error'>Autor nebol nájdený</Typography>
    )
}
