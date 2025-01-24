"use client"

import { useEntity } from '@/context/EntityContext';
import { updateKlient } from '@/lib/actions';
import { Stack, TextField, Button } from '@mui/material'
import { klient } from '@prisma/client';
import React from 'react'

export default function KlientAccount({ klient }: { klient: klient | null }) {

    return (
        <form action={(formData) => updateKlient(
            klient?.id!,
            formData.get("meno") as string,
            formData.get("priezvisko") as string
        )} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <TextField
                name='meno'
                variant='outlined'
                label='Meno'
                defaultValue={klient?.meno}
                required
            />
            <TextField
                variant='outlined'
                name='priezvisko'
                label='Priezvisko'
                defaultValue={klient?.priezvisko}
                required
            />
            <Button
                type="submit"
                disabled={false}
                variant="contained"
                sx={{ width: "14rem" }}
            >
                {false ? "Aktualizuje sa..." : "Aktualizovať údaje"}
            </Button>
            {false && <p>Údaje boli úspešne aktualizované</p>}
        </form>
    )
}
