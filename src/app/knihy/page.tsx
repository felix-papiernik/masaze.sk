//"use client";

import EntityList from '@/components/EntityList';
import KnihaCard from '@/components/KnihaCard';
import KnihyFilterList from '@/components/KnihyFilterList';
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
        <Box px={4}>
            <Typography variant="h1" mb={6}>Knihy</Typography>
            {knihy.length == 0 ?
                <p>Mrzí nás to, no momentálne v systéme nemáme žiadne knihy :(</p>
                :
                <KnihyFilterList knihy={knihyGrupedData as KnihaGroupedData[]} />
            }
        </Box>
    )
}
