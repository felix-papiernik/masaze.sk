// "use client";

import KnihaCard from '@/components/KnihaCard';
import KnihyFilterList from '@/components/layouts/KnihyFilterList';
import { addDemoKnihaAndRelations, deleteDemoKnihaAndRelations, getKnihy } from '@/lib/actions';
import prisma from '@/lib/prisma';
import { EntityGroupedData, KnihaGroupedData } from '@/lib/types';
import { Button, Grid2, Stack, Typography } from '@mui/material';
import { kniha } from '@prisma/client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

export default async function Knihy() {
    //const vsetkyKnihy = await getKnihy()
    // const [knihy, setKnihy] = useState<Awaited<ReturnType<typeof getKnihy>>>([]);
    // const [loading, setLoading] = useState(true);
    // //ked si otvorim knihu a vratim sa spat, nech sa mi zobrazi to co bolo, nie znova vsetky knihy
    // //moznosti:
    // //otvorit knihu cez modal
    // //otvorit knihu cez novu stranku, vyfiltrovane knihy sa ulozia do local storage

    // async function nacitajKnihy() {
    //     setLoading(true);
    //     const vsetkyKnihy = await getKnihy();
    //     setKnihy(vsetkyKnihy);
    //     setLoading(false);
    // }

    // useEffect(() => {
    //     nacitajKnihy();
    // }, []);

    const knihy = await getKnihy();
    const knihyGrupedData = knihy.map(k => ({
        type: 'kniha',
        data: k,
        view: { detailUrl: ("/knihy/" + k.id) },
        edit: {
            editUrl: ("/u/admin/knihy/" + k.id),
            handleDelete: async () => {
                "use server";
                await deleteDemoKnihaAndRelations();
            }
        }
    })) as EntityGroupedData[];

    return (
        <>
            <Typography variant='h1' mb={2}>Knihy</Typography>
            {knihy.length == 0 ?
                <p>Momentálne v systéme nie sú žiadne knihy :(</p>
                :
                <KnihyFilterList knihy={knihyGrupedData as KnihaGroupedData[]} direction='column'/>
            }
            <Button
                component={Link}
                href='/u/admin/knihy/nova'
                variant='contained'
                sx={{ mt: knihy.length > 0 ? 2 : 0 }}
            >Vytvoriť novú knihu</Button>
        </>
    )
}
