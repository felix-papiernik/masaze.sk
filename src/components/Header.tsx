import { Button, Stack } from '@mui/material'
import Link from 'next/link'
import React from 'react'
import { SignOutButton } from './buttons/SignOutButton'
import { verifySession } from '@/lib/actions';
import { secondaryMain } from '@/theme';

export default async function Header() {

    const session = await verifySession();
    const user = session ? session.pouzivatel : null;
    
    return (
        <Stack component="header" sx={{ backgroundColor: secondaryMain, justifyContent: "space-between", alignItems: "center", flexDirection: "row", padding: 2 }}>
            <Link href={"/"}>citaj.sk</Link>
            <Stack component="nav" direction="row" gap={4} alignItems="center">
                <Link href={"/knihy"}>Knihy</Link>
                <Link href={"/autori"}>Autori</Link>
                <Link href={"/zanre"}>Žánre</Link>
                {
                    user ? <>
                        {user.je_admin && <Link href={"/u/admin/"}>Správa systému</Link>}
                        <Link href={"/u/moje-knihy"}>Moje knihy</Link>
                        <Link href={"/u/moj-ucet"}>Môj účet</Link>
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
