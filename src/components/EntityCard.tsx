import { Button, Card, Chip, Link, Stack, Typography } from '@mui/material'
import React from 'react'
import DeleteBookButton from './buttons/DeleteBookButton'
import { EntityGroupedData } from '@/lib/types'
import DeleteAutorButton from './buttons/DeleteAutorButton'
import AddToListButton from './buttons/AddToListButton'
import DeleteKnihaPouzivatelButton from './buttons/DeleteKnihaPouzivatelButton'

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

    const getTitle = (detailUrl: string, title: string) => {
        return <Typography variant="h6"><Link href={detailUrl}>{title}</Link></Typography>
    }

    switch (ed.type) {
        case 'kniha':
            cardComponent = (
                <>
                    <Stack direction="row" justifyContent={"space-between"} spacing={1} alignItems={"flex-start"}>
                        {getTitle(ed.view.detailUrl, ed.data.nazov)}
                        {ed.edit === undefined && < AddToListButton kniha_id={ed.data.id} pouzivatel_id={ed.pouzivatel_id}/>}
                    </Stack>
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
                    {getTitle(ed.view.detailUrl, ed.data.meno + " " + ed.data.priezvisko)}
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
            cardComponent = (
                <>
                    {getTitle(ed.view.detailUrl, ed.data.nazov)}
                    <Typography variant="body1">Počet kníh v systéme: {ed.data._count.kniha}</Typography>
                    <Typography variant="body2" mb={1}>{ed.data.popis.slice(0, 100) + "..."}</Typography>
                    {ed.edit && <Button
                        variant="outlined"
                        color="primary"
                        component={Link}
                        href={ed.edit.editUrl}>Upraviť</Button>
                    }
                </>
            )
            break;
        case 'kniha_pouzivatel':
            let naPrecitanie = ed.data.stav === "chcemPrecitat";
            cardComponent = (
                <>
                    <Stack direction="row" justifyContent={"space-between"} spacing={1}>
                        {getTitle(ed.view.detailUrl, ed.data.kniha.nazov)}
                        <DeleteKnihaPouzivatelButton kniha_pouzivatel_id={ed.data.id} />
                    </Stack>
                    <Typography variant="body1">Autor: {ed.data.kniha.autor.meno} {ed.data.kniha.autor.priezvisko}</Typography>
                    <Typography variant="body2" mb={1}>Počet strán: {ed.data.kniha.pocet_stran}</Typography>
                    {ed.data.poznamka && <Typography variant='body2' my={1}>Poznámka ku knihe: {ed.data.poznamka}</Typography>}
                    <Chip label={naPrecitanie ? "Na prečítanie" : "Prečítané"} color={naPrecitanie ? 'info' : 'success'} />
                </>
            )
            break;
        default:
            throw new Error("Nepodporovaný typ entity")

    }
    return (
        <Card sx={{ px: 2, py: 1 }}>
            {cardComponent}
        </Card>
    )
}
