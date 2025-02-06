import EntityList from '@/components/EntityList';
import { getKnihy } from '@/lib/actions';
import prisma from '@/lib/prisma';
import { EntityGroupedData } from '@/lib/types';
import { Box, Typography } from '@mui/material';
import dayjs from 'dayjs';
import React from 'react'

export default async function Page({ params }
    : { params: Promise<{ id: string }> }
) {
    const id = parseInt((await params).id);

    const autor = await prisma.autor.findUnique({
        where: {
            id: id
        },
    })

    const autoroveKnihy = await getKnihy(id)
    const knihaGroupedData = autoroveKnihy.map(k => ({
        type: "kniha",
        data: k,
        view: { detailUrl: `/knihy/${k.id}` }
    })) as EntityGroupedData[]

    return (
        autor ? <Box width={"100%"}>
            <Typography variant="h1">{autor?.meno} {autor?.priezvisko}</Typography>
            <Typography variant="h3">O autorovi</Typography>
            <Typography variant="body1">Dátum narodenia: {dayjs(autor?.datum_nar).format("DD.MM.YYYY")}</Typography>
            <Typography variant="body1">Popis: {autor?.info}</Typography>
            <Typography variant="h4" mt={4} mb={1}>Knihy od autora</Typography>
            <EntityList data={knihaGroupedData} />
        </Box> : <Typography variant="h1" color='error'>Autor nebol nájdený</Typography>
    )
}
