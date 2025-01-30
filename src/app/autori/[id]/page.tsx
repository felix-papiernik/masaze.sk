import EntityList from '@/components/EntityList';
import prisma from '@/lib/prisma';
import { EntityGroupedData } from '@/lib/types';
import { Typography } from '@mui/material';
import React from 'react'

export default async function Page({ params }
    : { params: Promise<{ id: string }> }
) {
    const id = parseInt((await params).id);
    console.log(id)

    const autor = await prisma.autor.findUnique({
        where: {
            id: id
        },
    })

    const knihaGroupedData = ({

    }) as EntityGroupedData

    return (
        autor ? <>
            <Typography variant="h1">{autor?.meno} {autor?.priezvisko}</Typography>
            <Typography variant="h3">O autorovi</Typography>
            <Typography variant="body1">Dátum narodenia: {autor?.datum_nar}</Typography>
            <Typography variant="body1">Popis: {autor?.info}</Typography>
            <Typography variant="h4" mt={4}>Knihy od autora</Typography>
            <EntityList data={autor.kniha} />
        </> : <Typography variant="h1" color='error'>Autor nebol nájdený</Typography>
    )
}
