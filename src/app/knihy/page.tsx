//"use client";

import EntityList from '@/components/EntityList';
import KnihaCard from '@/components/KnihaCard';
import KnihyFilterList from '@/components/KnihyFilterList';
import { getAutori, getKnihy } from '@/lib/actions';
import { EntityGroupedData, KnihaGroupedData } from '@/lib/types';
import { Typography } from '@mui/material';
import { kniha } from '@prisma/client';
import React, { } from 'react'

export default async function Knihy() {

    const knihy = await getKnihy();
    const knihyGrupedData = knihy.map(k => ({
        type: 'kniha',
        data: k,
        view: { detailUrl: ("/knihy/" + k.id) }
    })) as EntityGroupedData[];

    const autoriData = (await getAutori()).map(a => ({
        type: 'autor',
        data: a,
        view: { detailUrl: ("/autori/" + a.id) }
    })) as EntityGroupedData[];

    async function filterBooks(formData: FormData) {
        "use server";
        const nazov = formData.get('nazov') as string;
    }

    return (
        <>
            <Typography variant="h1" mb={6}>Knihy</Typography>
            {knihy.length == 0 ?
                <p>Mrzí nás to, no momentálne v systéme nemáme žiadne knihy :(</p>
                :
                <KnihyFilterList knihy={knihyGrupedData as KnihaGroupedData[]} />
            }
            <KnihaCard kniha={knihy[0]} autor={knihy[0].autor} redirectUrl={'/knihy/'} />
            <Typography variant="h2" mt={6}>Autori</Typography>
            {autoriData.length == 0 ?
                <p>Mrzí nás to, no momentálne v systéme nemáme žiadnych autorov :(</p>
                :
                <EntityList data={autoriData} />
            }
        </>
    )
}
