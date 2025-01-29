//"use client";

import EntityList from '@/components/EntityList';
import KnihaCard from '@/components/KnihaCard';
import KnihyFilterList from '@/components/KnihyFilterList';
import PublicEntityPageLayout from '@/components/layouts/PublicEntityPageLayout';
import { getAutori, getKnihy } from '@/lib/actions';
import { EntityGroupedData, KnihaGroupedData } from '@/lib/types';
import { Box, Typography } from '@mui/material';
import { kniha } from '@prisma/client';
import React, { } from 'react'

export default async function Knihy() {

    const knihy = await getKnihy();
    const knihyGrupedData = knihy.map(k => ({
        type: 'kniha',
        data: k,
        view: { detailUrl: ("/knihy/" + k.id) }
    })) as EntityGroupedData[];

    return (
        <PublicEntityPageLayout
            title='Knihy'
            noEntitiesMessage='Momentálne v systéme nie sú žiadne knihy :('
            entityLength={knihy.length}
            filterList={<KnihyFilterList
                knihy={knihyGrupedData as KnihaGroupedData[]}
                direction='row'
            />}
        />
    )
}
