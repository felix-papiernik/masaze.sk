//"use client";

import EntityList from '@/components/EntityList';
import { getKnihy } from '@/lib/actions';
import { EntityGroupedData } from '@/lib/types';
import { Typography } from '@mui/material';
import React, {  } from 'react'

export default async function Knihy() {
    
    const knihy = await getKnihy();
    const knihyGrupedData = knihy.map(k => ({
        type: 'kniha',
        data: k,
        view: { detailUrl: ("/knihy/" + k.id) }
    })) as EntityGroupedData[];
    
    return (
        <>
            <Typography variant="h1">Knihy</Typography>
            {knihy.length == 0 ?
                <p>Mrzí nás to, no momentálne v systéme nemáme žiadne knihy :(</p>
                :
                <EntityList data={knihyGrupedData} filters={[]} />
            }
        </>
    )
}
