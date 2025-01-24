"use client";

import { Stack } from '@mui/material'
import Link from 'next/link'
import React from 'react'
import NavMenu from './NavMenu'
import { User } from '@prisma/client'
import { getUserFromServerCookies } from '@/lib/actions'
import { SignOutEntityButton } from './SignOutEntityButton'
import { EntityData } from '@/schema/TokenPayload'
import { useUser } from '@/app/context/UserContext';

export default function Header({ initialEntity }: { initialEntity: EntityData | null }) {

    //const entity = await getUserFromServerCookies();
    //console.log("entity", entity);

    const { entity } = useUser();

    return (
        <Stack component="header" sx={{ justifyContent: "space-between", flexDirection: "row", padding: 2, backgroundColor: "grey" }}>
            <Link href={"/"}>masaze.sk</Link>
            <Stack component="nav" direction="row" gap={4} alignItems="center">
                {
                    entity == null ? (<>
                        <Link href={"/"}>Domov</Link>
                        <Link href={"/prihlasenie"}>Prihlásiť sa</Link>
                        <Link href={"/registracia"}>Registrácia</Link>
                    </>) : (<>
                        <Link href={"/"}>Domov</Link>
                        <Link href={"/dashboard"}>Nástenka</Link>
                        <SignOutEntityButton />
                    </>)
                }
            </Stack>
        </Stack>
    )
}
