import { Button, Card, Link, Stack, Typography } from '@mui/material'
import { autor, kniha, zaner } from '@prisma/client'
import React from 'react'
import DeleteBookButton from './deleteEntityButtons/DeleteBookButton'
import { getAutori, getKnihy, getZanre } from '@/lib/actions'
import { EntityGroupedData } from '@/lib/types'
import DeleteAutorButton from './deleteEntityButtons/DeleteAutorButton'

export interface Editable {
    editUrl: string,
    handleDelete: () => Promise<void>
}

export interface EntityCardProps {
    entityGroupedData: EntityGroupedData
}

export default function EntityCard(props: EntityCardProps) {

    let ed = props.entityGroupedData;

    let cardComponent = null;
    switch (ed.type) {
        case 'kniha':
            cardComponent = (
                <>
                    <Typography variant="h5"><Link href={ed.view.detailUrl}>{ed.data.nazov}</Link></Typography>
                    <Typography variant="body1">Autor: {ed.data.autor.meno} {ed.data.autor.priezvisko}</Typography>
                    <Typography variant="body2" mb={1}>Počet strán: {ed.data.pocet_stran}</Typography>
                    {ed.edit && <Stack direction="row" spacing={1}>
                        <Button variant="outlined" color="primary" component={Link} href={ed.edit.editUrl}>Upraviť</Button>
                        <DeleteBookButton deleteBook={ed.edit.handleDelete} />
                    </Stack>
                    }
                </>
            )
            break;
        case 'autor':
            cardComponent = (
                <>
                    <Typography variant="h5"><Link href={ed.view.detailUrl}>{ed.data.meno} {ed.data.priezvisko}</Link></Typography>
                    <Typography variant="body2" mb={1}>Počet kníh v systéme: {ed.data._count.kniha}</Typography>
                    {ed.edit && <Stack direction="row" spacing={1}>
                        <Button variant="outlined" color="primary" component={Link} href={ed.edit.editUrl}>Upraviť</Button>
                        <DeleteAutorButton deleteAutor={ed.edit.handleDelete} />
                    </Stack>
                    }
                </>
            )
            break;
        case 'zaner':
    }
    return (
        <Card sx={{ p: 1 }}>
            {cardComponent}
        </Card>
    )
}
