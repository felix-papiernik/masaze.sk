import React from 'react'
import prisma from '@/lib/prisma'
import ZanerForm from '../ZanerForm'
import { Typography } from '@mui/material';

export default async function Page({ params }
    : { params: Promise<{ id: number }> }
) {
    const id = parseInt((await params).id.toString());
    const zaner = await prisma.zaner.findUnique({
        where: {
            id: id
        }
    })

    return (
        zaner ?
            <ZanerForm zanerToUpdate={zaner} />
            : <Typography variant="h1">Autor neexistuje</Typography>
    )
}
