"use client";

import { Button, Stack, useTheme } from '@mui/material'
import Link from 'next/link'
import React from 'react'
import { SignOutButton } from './SignOutButton'
import { useAuth } from '@/context/AuthContext';

export default function Header() {

    const { auth } = useAuth();
    const theme = useTheme();

    return (
        <Stack component="header" sx={{ backgroundColor: theme.palette.secondary.main, justifyContent: "space-between", alignItems: "center", flexDirection: "row", padding: 2}}>
            <Link href={"/"}>citaj.sk</Link>
            <Stack component="nav" direction="row" gap={4} alignItems="center">
                <Link href={"/knihy"}>Knihy</Link>
                <Link href={"/autori"}>Autori</Link>
                {
                    auth ? <>
                        {auth.pouzivatel.je_admin && <Link href={"/u/admin/"}>Správa systému</Link>}
                        <Link href={"/u/moje-knihy"}>Moje knihy</Link>
                        <Link href={"/u/moj-ucet"}>Môj účet - {auth.pouzivatel.meno}</Link>
                        <SignOutButton />
                    </> :
                        (
                            <>
                                <Button
                                    component={Link}
                                    variant="contained"
                                    color='primary'
                                    style={{ textTransform: "none", textDecoration: "none" }}
                                    href='/prihlasenie'
                                >
                                    Prihlásiť sa
                                </Button>
                                <Button
                                    component={Link}
                                    variant="outlined"
                                    color='primary'
                                    style={{ textTransform: "none", textDecoration: "none" }}
                                    href='/registracia'
                                >
                                    Zaregistrovať sa
                                </Button>
                            </>
                        )
                }
            </Stack>
        </Stack>
    )
}
