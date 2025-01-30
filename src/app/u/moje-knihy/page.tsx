"use client";

import EntityList from '@/components/EntityList';
import { useAuth } from '@/context/AuthContext';
import { getKnihy, getPouzivateloveKnihy } from '@/lib/actions';
import { EntityGroupedData } from '@/lib/types';
import { Typography } from '@mui/material'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

export default function MojeKnihy() {

    const { auth } = useAuth();
    const [userBooks, setUserBooks] = useState([] as EntityGroupedData[]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!auth) return;
        const getUserBooks = async () => {
            setLoading(true);
            return await getPouzivateloveKnihy(auth?.pouzivatel.id)
        }

        getUserBooks().then((books) => {
            const knihaGroupedData = books.map(k => ({
                type: "kniha_pouzivatel",
                data: k,
                view: { detailUrl: `/u/moje-knihy/${k.id}` }
            })) as EntityGroupedData[]
            setUserBooks(knihaGroupedData);
            setLoading(false);
        });

        const cleanUp = () => {
            setUserBooks([]);
        };
        return cleanUp;
    }, []);

    return (
        <>
            <Typography variant="h3" mt={4} mb={2}>Moje knihy</Typography>
            <Typography variant="body1">Tuto nájdeš knihy, ktoré si si uložil do zoznamu, alebo si ich už prečítal.</Typography>
            {loading === false ? 
            <EntityList
                data={userBooks}
                notFoundElement={<Typography>V tvojom zozname nie sú žiadne knihy, <Link href={"/knihy"}>poď si ich nájsť</Link></Typography>}
            />
            : <Typography variant="h6">Načítavam tvoje knihy...</Typography>}
        </>
    )
}
