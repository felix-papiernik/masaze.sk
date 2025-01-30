import EntityList from '@/components/EntityList';
import { getPouzivateloveKnihy, verifySession } from '@/lib/actions';
import { EntityGroupedData } from '@/lib/types';
import { Typography } from '@mui/material'
import Link from 'next/link';
import React, {  } from 'react'

export default async function MojeKnihy() {

    const auth = await verifySession()
    
    if (!auth) {
        return null;
    }
    
    const userBooks = await getPouzivateloveKnihy(auth?.pouzivatel.id);

    const knihaGroupedData = userBooks.map(k => ({
        type: "kniha_pouzivatel",
        data: k,
        view: { detailUrl: `/u/moje-knihy/${k.id}` }
    })) as EntityGroupedData[]

    return (
        <>
            <Typography variant="h3" mt={4} mb={2}>Moje knihy</Typography>
            <Typography variant="body1">Tuto nájdeš knihy, ktoré si si uložil do zoznamu, alebo si ich už prečítal.</Typography>
            <EntityList
                data={knihaGroupedData}
                notFoundElement={<Typography>V tvojom zozname nie sú žiadne knihy, <Link href={"/knihy"}>poď si ich nájsť</Link></Typography>}
            />
        </>
    )
}
