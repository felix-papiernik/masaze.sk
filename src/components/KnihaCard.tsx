"use server";

import { Button, Card, Stack, Typography } from '@mui/material'
import { autor, kniha } from '@prisma/client'
import Link from 'next/link'
import React from 'react'
import DeleteBookButton from './DeleteBookButton';
import prisma from '@/lib/prisma';
import { redirectUrlAfterLogin } from '@/lib/utils';
import { revalidatePath } from 'next/cache';

type knihaCardProps = {
    kniha: kniha
    autor: autor
    redirectUrl: string
    editUrl?: string
}
export default async function KnihaCard(props: knihaCardProps) {

    let redirectUrl = props.redirectUrl.endsWith("/") ? props.redirectUrl : props.redirectUrl + "/"
    redirectUrl += props.kniha.id

    async function deleteBook() {
        "use server";
        await prisma.kniha.delete({
            where: {
                id: props.kniha.id
            }
        })
        revalidatePath(redirectUrlAfterLogin(true))
    }

    return (
        <Card sx={{ p: 1 }}>
            <Typography variant="h5"><Link href={redirectUrl}>{props.kniha.nazov}</Link></Typography>
            <Typography variant="body1">Autor: {props.autor.meno} {props.autor.priezvisko}</Typography>
            <Typography variant="body2" mb={1}>Počet strán: {props.kniha.pocet_stran}</Typography>
            <Stack direction="row" spacing={1}>
                {props.editUrl &&
                    <Button variant="outlined" color="primary" component={Link} href={redirectUrl}>Upraviť</Button>
                }
                <DeleteBookButton deleteBook={deleteBook}/>
            </Stack>
        </Card>
    )
}
