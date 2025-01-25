import { Grid2, Stack } from '@mui/material'
import Link from 'next/link'
import React from 'react'

export default function layout(props: { children: React.ReactNode }) {
    return (
        <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 12, md: 3, lg: 1 }} border={"1px solid black"}>
                <h1 style={{margin: 0, marginBottom: 20}}>Layout</h1>
                <Stack direction={"column"} gap={2} marginBottom={4}>
                    <Link href={"/u/admin/knihy"} style={{ display: "inline-block" }}>Knihy</Link>
                    <Link href={"/u/admin/autori"} style={{ display: "inline-block" }}>Autori</Link>
                    <Link href={"/u/admin/zanre"} style={{ display: "inline-block" }}>Žánre</Link>
                </Stack>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 9, lg: 11 }} border={"1px solid black"}>
                {props.children}
            </Grid2>
        </Grid2>

    )
}
