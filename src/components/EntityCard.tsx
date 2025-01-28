import { Button, Card, Link, Stack, Typography } from '@mui/material'
import { autor, kniha, zaner } from '@prisma/client'
import React from 'react'
import DeleteBookButton from './DeleteBookButton'
import { getAutori, getKnihy, getZanre } from '@/lib/actions'
import { EntityGroupedData } from '@/lib/types'

type Editable = {
    editUrl: string,
    handleDelete: () => Promise<void>
}

type EntityCardProps = {
    entity: EntityGroupedData,
    editable?: Editable,
    entityDetailUrl: string
}

export default function EntityCard(props: EntityCardProps) {

    let cardComponent = null;
    switch (props.entity.type) {
        case 'kniha':
            cardComponent = (
                <>
                    <Typography variant="h5"><Link href={props.entityDetailUrl}>{props.entity.data.nazov}</Link></Typography>
                    <Typography variant="body1">Autor: {props.entity.data.autor.meno} {props.entity.data.autor.priezvisko}</Typography>
                    <Typography variant="body2" mb={1}>Počet strán: {props.entity.data.pocet_stran}</Typography>
                    {props.editable && <Stack direction="row" spacing={1}>
                        <Button variant="outlined" color="primary" component={Link} href={props.editable.editUrl}>Upraviť</Button>
                        <DeleteBookButton deleteBook={props.editable.handleDelete} />
                    </Stack>
                    }
                </>
            )
            break;
        case 'autor':
        case 'zaner':
    }
    return (
        <Card sx={{ p: 1 }}>
            {cardComponent}
        </Card>
    )
}
