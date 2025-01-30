import EntityList from '@/components/EntityList';
import { getKnihy } from '@/lib/actions';
import prisma from '@/lib/prisma';
import { EntityGroupedData, KnihaGroupedData } from '@/lib/types';
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

    const autoroveKnihy = await getKnihy(id)
    const knihaGroupedData = autoroveKnihy.map(k => ({
        type: "kniha",
        data: k
    })) as KnihaGroupedData[]

    return (
        autor ? <>
            <Typography variant="h1">{autor?.meno} {autor?.priezvisko}</Typography>
            <Typography variant="h3">O autorovi</Typography>
            <Typography variant="body1">Dátum narodenia: {autor?.datum_nar}</Typography>
            <Typography variant="body1">Popis: {autor?.info}</Typography>
            <Typography variant="h4" mt={4}>Knihy od autora</Typography>
            <EntityList data={knihaGroupedData} />
        </> : <Typography variant="h1" color='error'>Autor nebol nájdený</Typography>
    )
}
