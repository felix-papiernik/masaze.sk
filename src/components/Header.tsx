"use client";

import { Stack } from '@mui/material'
import Link from 'next/link'
import React from 'react'
import { SignOutButton } from './SignOutButton'
import { useEntity } from '@/context/EntityContext';
import { useAuth } from '@/context/AuthContext';

export default function Header() {

    const { entity } = useEntity();
    const { auth } = useAuth();

    return (
        <Stack component="header" sx={{ justifyContent: "space-between", alignItems: "center", flexDirection: "row", padding: 2, backgroundColor: "grey" }}>
            <Link href={"/"}>masaze.sk</Link>
            <Stack component="nav" direction="row" gap={4} alignItems="center">
                <Link href={"/"}>Domov</Link>
                {
                    auth == null ? (<>
                        <Link href={"/prihlasenie"}>Prihlásiť sa</Link>
                        <Link href={"/registracia"}>Registrácia</Link>
                    </>) : (<>
                        <Link href={"/dashboard"}>Nástenka</Link>
                        <Link href={"/my-account"}>Môj účet - {auth.entity}</Link>
                        <SignOutButton />
                    </>)
                }
            </Stack>
        </Stack>
    )
}
