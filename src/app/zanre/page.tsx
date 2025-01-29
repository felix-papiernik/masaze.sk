import PublicEntityPageLayout from '@/components/layouts/PublicEntityPageLayout';
import ZanreFilterList from '@/components/layouts/ZanreFilterList';
import { getZanre } from '@/lib/actions';
import { ZanerGroupedData } from '@/lib/types';
import { Typography } from '@mui/material';
import React from 'react'

export default async function page() {
    const zanre = (await getZanre()).map(z => ({
        type: 'zaner',
        data: z,
        view: { detailUrl: ("/zanre/" + z.id) },

    })) as ZanerGroupedData[];

    return (
        <PublicEntityPageLayout
            title="Žánre"
            entityLength={zanre.length}
            noEntitiesMessage='Momentálne v systéme nie je žiaden žáner :('
            filterList={<ZanreFilterList zanre={zanre} direction='row' />}
        />
    )
}