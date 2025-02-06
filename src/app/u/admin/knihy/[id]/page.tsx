"use server";

import prisma from '@/lib/prisma';
import { Typography } from '@mui/material';
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
}
