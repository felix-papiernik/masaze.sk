import prisma from '@/lib/prisma';
import { Typography } from '@mui/material';
import React from 'react'

export default async function Page({ params }
    : { params: Promise<{ id: string }> }
) {
    const id = parseInt((await params).id);
    console.log(id)

    const data = await prisma.zaner.findUnique({
        where: {
            id: id
        }
    })

    return (
        <>
            <Typography variant="h1">{data?.nazov}</Typography>
            <Typography variant="body1">Popis: {data?.popis}</Typography>
        </>
    )
}
