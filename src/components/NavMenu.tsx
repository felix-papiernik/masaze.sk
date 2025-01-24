import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { Button, Typography } from '@mui/material';
import SignOutButton from './SignOutButton';
import { useUser } from '@/app/context/UserContext';
import { User } from '@prisma/client';
import { cookies } from 'next/headers';
import { useRouter } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { jwtDecrypt } from 'jose';
import { getUserFromServerCookies } from '@/lib/actions';
import { SignOutEntityButton } from './SignOutEntityButton';


export default async function NavMenu() {

    /*let user: User | null = null;
      // Načítanie údajov z HTTP-only cookies na serveri
      const cookieStore = await cookies();
      const token = cookieStore.get("auth_token")?.value;
    
      if (token) {
        try {
          const secret = new TextEncoder().encode(process.env.JWT_SECRET);
          const { payload } = await jwtVerify(token, secret);
          user = payload as User; // Predpokladáme, že payload obsahuje údaje používateľa
        } catch (err) {
          console.error("Invalid or expired token:", err);
        }
      }
*/
    const entity = await getUserFromServerCookies();
    console.log("entity", entity);
    /*const handleSignOut = async () => {
        try {
            const response = await fetch('/api/signout', {
                method: 'GET',
            });

            if (response.ok) {
                // Resetuj stav používateľa v UserContext
                setUser(null);
                // Presmeruj na domovskú alebo prihlasovaciu stránku
                router.push('/prihlasenie');
            } else {
                console.error('Odhlásenie zlyhalo:', response.statusText);
            }
        } catch (err) {
            console.error('Chyba pri odhlásení:', err);
        }
    };*/

    return (
        entity == null ? (<>
            <Link href={"/"}>Domov</Link>
            <Link href={"/prihlasenie"}>Prihlásiť sa</Link>
            <Link href={"/registracia"}>Registrácia</Link>
        </>) : (<>
            <Link href={"/"}>Domov</Link>
            <Link href={"/dashboard"}>Nástenka</Link>
            <SignOutEntityButton />
        </>)
    )
}
