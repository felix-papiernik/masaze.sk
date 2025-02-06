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
    const user = session ? session.pouzivatel : null;
    
    //na pc chcem aby iba prihlasit sa/registracia/odhlasit boli tlacidla, ostatne vsetko linky bez ikon
    //na mobile nech su vsetko tlacidla

    return (
        <Stack component="header" sx={{ backgroundColor: secondaryMain, justifyContent: "space-between", alignItems: "center", flexDirection: "row", padding: 2 }}>
            <Link href={"/"}>citaj.sk</Link>
            <MobileHeaderDialog />
            <Stack component="nav" direction="row" gap={6} alignItems="center">
                <Link href={"/knihy"}>Knihy</Link>
                <Link href={"/autori"}>Autori</Link>
                <Link href={"/zanre"}>Žánre</Link>
                {
                    user ? <>
                        <Link href={"/u/"}>Nástenka</Link>
                        <SignOutButton variant='outlined' includeIcon/>
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
