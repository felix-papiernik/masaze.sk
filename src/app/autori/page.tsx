import AutoriFilterList from '@/components/layouts/AutorFIlterList';
import PublicEntityPageLayout from '@/components/layouts/PublicEntityPageLayout';
import { getAutori } from '@/lib/actions';
import { AutorGroupedData } from '@/lib/types';
import React from 'react'

export default async function Autori() {


    const autoriData = (await getAutori()).map(a => ({
        type: 'autor',
        data: a,
        view: { detailUrl: ("/autori/" + a.id) }
    })) as AutorGroupedData[];


    return (
        <PublicEntityPageLayout
            title='Autori'
            noEntitiesMessage='Momentálne v systéme nie je žiaden autor :('
            entityLength={autoriData.length}
            filterList={<AutoriFilterList
                autori={autoriData}
                direction='row'
            />}
        />
    )
}
