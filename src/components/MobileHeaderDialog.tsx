"use client";

import { Box, Button, Dialog, IconButton, Link } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import React, { useState } from 'react'
import { pouzivatel } from '@prisma/client';
import NavMenu from './NavMenu';
import { Book, Group, Abc, Edit, Person, Clear } from '@mui/icons-material';
import { getAdminLinks } from '@/lib/utils';
import { SignOutButton } from './buttons/SignOutButton';

export default function MobileHeaderDialog({ pouzivatel }: { pouzivatel?: pouzivatel }) {

    const [menuOpen, setMenuOpen] = useState(false);

    const adminLinks = getAdminLinks();

    return (
        <Box sx={{ display: { xs: "block", lg: "none" } }}>
            <IconButton onClick={() => setMenuOpen(true)}>
                <MenuIcon />
            </IconButton>
            <Dialog open={menuOpen} onClose={() => setMenuOpen(false)} fullScreen onClick={() => setMenuOpen(false)}>
                <IconButton
                    onClick={() => setMenuOpen(false)}
                    sx={{ marginLeft: "auto" }}>
                    <Clear sx={{ fill: "black" }} />
                </IconButton>
                <NavMenu user={pouzivatel} linkGroups={[
                    {
                        links: [
                            { text: "Knihy", url: "/knihy", icon: <Book /> },
                            { text: "Autori", url: "/autori", icon: <Group /> },
                            { text: "Žánre", url: "/zanre", icon: <Abc /> }
                        ], addDivider: true
                    },
                    ...(pouzivatel && pouzivatel.je_admin ? [{
                        title: {
                            text: "Správa systému", url: "/u/admin", icon: <Edit />
                        },
                        links: [
                            { text: adminLinks[0].label, url: adminLinks[0].href, icon: adminLinks[0].icon },
                            { text: adminLinks[1].label, url: adminLinks[1].href, icon: adminLinks[1].icon },
                            { text: adminLinks[2].label, url: adminLinks[2].href, icon: adminLinks[2].icon }
                        ], addDivider: true
                    }] : []),
                    ...(pouzivatel ? [{
                        links: [
                            { text: "Moje knihy", url: "/u/moje-knihy", icon: <Book /> },
                            { text: "Môj účet", url: "/u/moj-ucet", icon: <Person /> }
                        ], addDivider: true
                    },] : [])
                ]} />
                {pouzivatel ? <SignOutButton includeIcon /> :
                    <>
                        <Button
                            component={Link}
                            variant="contained"
                            color='primary'
                            sx={{ textTransform: "none", textDecoration: "none", mb: 2 }}
                            href='/prihlasenie'
                        >
                            Prihlásiť sa
                        </Button>
                        <Button
                            component={Link}
                            variant="outlined"
                            color='primary'
                            sx={{ textTransform: "none", textDecoration: "none", mb: 2 }}
                            href='/registracia'
                        >
                            Zaregistrovať sa
                        </Button>
                    </>
                }
            </Dialog>
        </Box>
    )
}
