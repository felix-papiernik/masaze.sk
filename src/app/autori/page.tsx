import EntityList from '@/components/EntityList';
import { getAutori } from '@/lib/actions';
import prisma from '@/lib/prisma'
import { EntityGroupedData } from '@/lib/types';
import { Typography } from '@mui/material';
import React from 'react'

export default async function Autori() {

    
    const autoriData = (await getAutori()).map(a => ({
        type: 'autor',
        data: a,
        view: { detailUrl: ("/autori/" + a.id) }
    })) as EntityGroupedData[];


    return (
        <>
            <Typography variant="h2" mt={6}>Autori</Typography>
            {autoriData.length == 0 ?
                <p>Mrzí nás to, no momentálne v systéme nemáme žiadnych autorov :(</p>
                :
                <EntityList data={autoriData} />
            }
        </>
    )
}
