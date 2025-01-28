import { Button, Card, Link, Stack, Typography } from '@mui/material'
import { autor, kniha, zaner } from '@prisma/client'
import React from 'react'
import DeleteBookButton from './DeleteBookButton'
import { getAutori, getKnihy, getZanre } from '@/lib/actions'

type Editable = {
    editUrl: string,
    handleDelete: () => Promise<void>
}

type EntityCardProps = { type: "kniha", entity: Awaited<ReturnType<typeof getKnihy>>[number], editable?: Editable, entityDetailUrl: string }
    | { type: "autor", entity: Awaited<ReturnType<typeof getAutori>>[number], editable?: Editable, entityDetailUrl: string }
    | { type: "zaner", entity: Awaited<ReturnType<typeof getZanre>>[number], editable?: Editable, entityDetailUrl: string }



export default function EntityCard(props: EntityCardProps) {
    let redirectUrl = props.entityDetailUrl;
    props.entityDetailUrl.endsWith("/") && redirectUrl + "/";

    let editUrl = props.editable?.editUrl;

    let cardComponent = null;
    switch (props.type) {
        case 'kniha':
            cardComponent = (
                <>
                    <Typography variant="h5"><Link href={redirectUrl}>{props.entity.nazov}</Link></Typography>
                    <Typography variant="body1">Autor: {props.entity.autor.meno} {props.entity.autor.priezvisko}</Typography>
                    <Typography variant="body2" mb={1}>Počet strán: {props.entity.pocet_stran}</Typography>
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
