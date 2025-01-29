import { verifySession } from '@/lib/actions';
import prisma from '@/lib/prisma';
import { Typography } from '@mui/material';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react'

export default async function Page({ params }
    : { params: Promise<{ id: string }> }
) {
    const id = parseInt((await params).id);
    console.log(id)

    const data = await prisma.kniha.findUnique({
        where: {
            id: id
        },
        include: {
            autor: true,
            zaner: true
        }
    })

    if (!data) {
        notFound()
    }

    return (
        <>
            <Typography variant="h1">{data?.nazov}</Typography>
            <Typography variant="body1">Počet strán: {data?.pocet_stran}</Typography>
            <Typography variant="body1">Autor: {data?.autor.meno} {data?.autor.priezvisko}</Typography>
            <Typography variant="body1" component={Link} href={"/zanre/" + data.zaner_id}>Žáner: {data.zaner.nazov}</Typography>
        </>
    )
}
