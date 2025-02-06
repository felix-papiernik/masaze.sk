//"use client";

import KnihyFilterList from '@/components/layouts/KnihyFilterList';
import PublicEntityPageLayout from '@/components/layouts/PublicEntityPageLayout';
import { getKnihy } from '@/lib/actions';
import { EntityGroupedData, KnihaGroupedData } from '@/lib/types';
import React, { } from 'react'

export default async function Knihy() {

    const knihy = await getKnihy();
    const knihyGrupedData = knihy.map(k => ({
        type: 'kniha',
        data: k,
        view: { detailUrl: ("/knihy/" + k.id) }
    })) as KnihaGroupedData[];

    return (
        <PublicEntityPageLayout
            title='Knihy'
            noEntitiesMessage='Momentálne v systéme nie sú žiadne knihy :('
            entityLength={knihy.length}
            filterList={<KnihyFilterList
                knihy={knihyGrupedData}
                direction='row'
            />}
        />
    )
}
