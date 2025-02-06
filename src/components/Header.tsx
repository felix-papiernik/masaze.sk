import { Button, Stack } from '@mui/material'
import Link from 'next/link'
import React from 'react'
import { SignOutButton } from './buttons/SignOutButton'
import { verifySession } from '@/lib/actions';
import { secondaryMain } from '@/theme';
import MobileHeaderDialog from './MobileHeaderDialog';
import { MenuItemLinkProps } from './buttons/MenuListItemButton';

export type LinkGroup = {
    title?: MenuItemLinkProps;
    links: MenuItemLinkProps[];
    addDivider?: boolean;
}

export default async function Header() {

    const session = await verifySession();
    const user = session ? session.pouzivatel : undefined;

    return (
        <Stack component="header" sx={{ backgroundColor: "lightgray", justifyContent: "space-between", alignItems: "center", flexDirection: "row", padding: 2 }}>
            <Link href={"/"}>citaj.sk</Link>
            <MobileHeaderDialog pouzivatel={user} />
            <Stack component="nav" direction="row" gap={6} alignItems="center" sx={{display: { xs: "none", lg: "flex" }}}>
                <Link href={"/knihy"}>Knihy</Link>
                <Link href={"/autori"}>Autori</Link>
                <Link href={"/zanre"}>Žánre</Link>
                {
                    user ? <>
                        <Link href={"/u/"}>Nástenka</Link>
                        <SignOutButton variant='outlined' includeIcon />
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
