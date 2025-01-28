import { Grid2, Stack, Typography } from '@mui/material'
import Link from 'next/link'
import React from 'react'

export default function layout(props: { children: React.ReactNode }) {

    const links = [
        { href: "/u/admin/knihy", label: "Knihy" },
        { href: "/u/admin/autori", label: "Autorov" },
        { href: "/u/admin/zanre", label: "Žánre" },
    ]

    return (
        <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 12, md: 3, lg: 2 }} border={"1px solid black"}>
                <Typography variant='h3' component={"h1"} mb={2}>Spravovať</Typography>
                <Stack direction={"column"} gap={1} marginBottom={4}>
                    {
                        links.map(l => (
                            <Link key={l.href} href={l.href} 
                            style={{ padding: 4 }}>{l.label}</Link>
                        ))
                    }
                </Stack>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 9, lg: 10 }} border={"1px solid black"}>
                {props.children}
            </Grid2>
        </Grid2>
    )
}
