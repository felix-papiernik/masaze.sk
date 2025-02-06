import { verifySession } from '@/lib/actions'
import Link from 'next/link';
import React from 'react'

export default async function Unauthorized() {

    const auth = await verifySession();

    return (
        <div style={{ textAlign: "center", marginTop: "5rem", display: "flex", flexDirection: "column",}}>
            <h1>Nemáte oprávnenie na prístup k tejto stránke</h1>
            <p>Ak si myslíte, že ide o chybu, kontaktujte správcu systému.</p>
            <Link href="/">Späť na hlavnú stránku</Link>
            {auth ? <Link href="/u/nastenka">Späť na nástenku</Link> : null}
        </div>
    )
}
