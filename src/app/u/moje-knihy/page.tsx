"use client";

import EntityList from '@/components/EntityList';
import { useAuth } from '@/context/AuthContext';
import { getKnihy } from '@/lib/actions';
import { EntityGroupedData } from '@/lib/types';
import { Typography } from '@mui/material'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

export default function MojeKnihy() {

    const { auth } = useAuth();
    const [userBooks, setUserBooks] = useState([] as EntityGroupedData[]);

    useEffect(() => {
        if (!auth) return;
        const getUserBooks = async () => {
            return await getKnihy(auth?.pouzivatel.id)
        }

        getUserBooks().then((books) => {
            const knihaGroupedData = books.map(k => ({
                type: "kniha",
                data: k,
                view: { detailUrl: `/knihy/${k.id}` }
            })) as EntityGroupedData[]
            setUserBooks(knihaGroupedData);
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
            <EntityList
                data={userBooks}
                notFoundElement={<Typography>V tvojom zozname nie sú žiadne knihy, <Link href={"/knihy"}>poď si ich nájsť</Link></Typography>}
            />
        </>
    )
}
