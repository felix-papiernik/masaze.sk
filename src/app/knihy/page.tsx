//"use client";

import KnihaCard from '@/components/KnihaCard';
import { addDemoKnihaAndRelations, deleteDemoKnihaAndRelations, getKnihy } from '@/lib/actions';
import { Button, Grid2, Typography } from '@mui/material';
import { kniha } from '@prisma/client';
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

    return (
        <>
            <Typography variant="h1">Knihy</Typography>
            {knihy.length == 0 ?
                <p>Mrzí nás to, no momentálne v systéme nemáme žiadne knihy :(</p>
                :
                <Grid2 container columns={{ xs: 1, md: 2, lg: 4 }} spacing={2} padding={2}>
                    {knihy.map(k => (
                        <Grid2 key={k.id} size={1}>
                            <KnihaCard
                                kniha={k}
                                autor={k.autor}
                                redirectUrl='/knihy'
                            />
                        </Grid2>
                    ))}
                </Grid2 >
            }
        </>
    )
}
