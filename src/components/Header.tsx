"use client";

import { Stack } from '@mui/material'
import Link from 'next/link'
import React from 'react'
import { SignOutButton } from './SignOutButton'
import { useAuth } from '@/context/AuthContext';

export default function Header() {

    const { auth } = useAuth();

    return (
        <Stack component="header" sx={{ justifyContent: "space-between", alignItems: "center", flexDirection: "row", padding: 2, backgroundColor: "grey" }}>
            <Link href={"/"}>citaj.sk</Link>
            <Stack component="nav" direction="row" gap={4} alignItems="center">
                {auth == null && (
                    <>
                        <Link href={"/prihlasenie"}>Prihlásiť sa</Link>
                        <Link href={"/registracia"}>Registrácia</Link>
                    </>
                )}
                <Link href={"/knihy"}>Knihy</Link>
                <Link href={"/autori"}>Autori</Link>
                {
                    auth && <>
                        {auth.pouzivatel.je_admin && <Link href={"/u/admin/"}>Správa systému</Link>}
                        <Link href={"/u/moje-knihy"}>Moje knihy</Link>
                        <Link href={"/u/moj-ucet"}>Môj účet - {auth.pouzivatel.meno}</Link>
                        <SignOutButton />
                    </>
                }
            </Stack>
        </Stack>
    )
}
