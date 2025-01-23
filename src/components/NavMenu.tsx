"use client";

import React from 'react'
import Link from 'next/link';
import { Button, Typography } from '@mui/material';
import SignOutButton from './SignOutButton';
import { useUser } from '@/app/context/UserContext';

export default function NavMenu() {

    const { user } = useUser();

    /*
!session ? (<>
            <Link href={"/"}>Domov</Link>
            <Link href={"/prihlasenie"}>Prihlásiť sa</Link>
            <Link href={"/registracia"}>Registrácia</Link>
        </>) : (<>
            <Link href={"/"}>Domov</Link>
            <Link href={"/dashboard"}>Nástenka</Link>
            <SignOutButton />
        </>)
    */

    return (
        !user ? (<>
            <Link href={"/"}>Domov</Link>
            <Link href={"/prihlasenie"}>Prihlásiť sa</Link>
            <Link href={"/registracia"}>Registrácia</Link>
        </>) : (<>
            <Link href={"/"}>Domov</Link>
            <Link href={"/dashboard"}>Nástenka</Link>
            <Typography variant="h6">Email: {user?.email}</Typography>
        </>)
    )
}
