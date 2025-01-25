import { Stack } from '@mui/material'
import Link from 'next/link'
import React from 'react'

export default function layout() {
    return (
        <Stack>
            <h1>Layout</h1>
            <Stack direction={"column"} gap={2} marginBottom={4}>
                <Link href={"/u/admin/knihy"} style={{ display: "inline-block" }}>Knihy</Link>
                <Link href={"/u/admin/autori"} style={{ display: "inline-block" }}>Autori</Link>
                <Link href={"/u/admin/zanre"} style={{ display: "inline-block" }}>Žánre</Link>
            </Stack>
        </Stack>
    )
}
