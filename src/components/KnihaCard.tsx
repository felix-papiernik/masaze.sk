import { Card, Typography } from '@mui/material'
import { autor, kniha } from '@prisma/client'
import Link from 'next/link'
import React from 'react'

type knihaCardProps = {
    kniha: kniha
    autor: autor
    redirectUrl: string
}
export default function KnihaCard(props: knihaCardProps) {

    let redirectUrl = props.redirectUrl.endsWith("/") ? props.redirectUrl : props.redirectUrl + "/"
    redirectUrl += props.kniha.id

    return (
        <Card sx={{ p: 1 }}>
            <Typography variant="h5"><Link href={redirectUrl}>{props.kniha.nazov}</Link></Typography>
            <Typography variant="body1">Autor: {props.autor.meno} {props.autor.priezvisko}</Typography>
            <Typography variant="body2" mt={2}>Počet strán: {props.kniha.pocet_stran}</Typography>
        </Card>
    )
}
