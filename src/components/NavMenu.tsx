import React from 'react'
import { auth, signOut } from '../../auth';
import Link from 'next/link';
import { Button } from '@mui/material';
import SignOutButton from './SignOutButton';

export default async function NavMenu() {

    const session = await auth();

    return (
        !session ? (<>
            <Link href={"/"}>Domov</Link>
            <Link href={"/prihlasenie"}>Prihlásiť sa</Link>
            <Link href={"/registracia"}>Registrácia</Link>
        </>) : (<>
            <Link href={"/"}>Domov</Link>
            <Link href={"/dashboard"}>Nástenka</Link>
            <SignOutButton />
        </>)
    )
}
