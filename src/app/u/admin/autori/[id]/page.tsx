import React from 'react'
import prisma from '@/lib/prisma'
import AutorForm from '../AutorForm'
import { Typography } from '@mui/material';

export default async function Page({ params }
    : { params: Promise<{ id: number }> }
) {
    const id = parseInt((await params).id.toString());
    const autor = await prisma.autor.findUnique({
        where: {
            id: id
        }
    })

    return (
        autor ?
            <AutorForm autorToUpdate={autor} />
            : <Typography variant="h1">Autor neexistuje</Typography>
    )
}
