import KnihyFilterList from '@/components/layouts/KnihyFilterList';
import PublicEntityPageLayout from '@/components/layouts/PublicEntityPageLayout';
import { getKnihy, verifySession } from '@/lib/actions';
import { KnihaGroupedData } from '@/lib/types';
import React, { } from 'react'

export default async function Knihy() {
    const session = await verifySession();
    const knihy = await getKnihy();
    const knihyGroupedData = knihy.map(k => ({
        type: 'kniha',
        data: k,
        view: { detailUrl: ("/knihy/" + k.id) },
        pouzivatel_id: session?.pouzivatel.id
    })) as KnihaGroupedData[];

    return (
        <PublicEntityPageLayout
            title='Knihy'
            noEntitiesMessage='Momentálne v systéme nie sú žiadne knihy :('
            entityLength={knihy.length}
            filterList={<KnihyFilterList
                knihy={knihyGroupedData}
                direction='row'
            />}
        />
    )
}
