"use client";

import KnihaCard from '@/components/KnihaCard';
import { addDemoKnihaAndRelations, deleteDemoKnihaAndRelations, getKnihy } from '@/lib/actions';
import { Button, Stack } from '@mui/material';
import { kniha } from '@prisma/client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

export default function Knihy() {
    //const vsetkyKnihy = await getKnihy()
    const [knihy, setKnihy] = useState<Awaited<ReturnType<typeof getKnihy>>>([]);
    const [loading, setLoading] = useState(true);
    //ked si otvorim knihu a vratim sa spat, nech sa mi zobrazi to co bolo, nie znova vsetky knihy
    //moznosti:
    //otvorit knihu cez modal
    //otvorit knihu cez novu stranku, vyfiltrovane knihy sa ulozia do local storage

    async function nacitajKnihy() {
        setLoading(true);
        const vsetkyKnihy = await getKnihy();
        setKnihy(vsetkyKnihy);
        setLoading(false);
    }

    async function addDemoKnihu() {
        setLoading(true);
        const demoKniha = await addDemoKnihaAndRelations();
        nacitajKnihy();
    }

    async function deleteDemoKnihu() {
        await deleteDemoKnihaAndRelations();
        nacitajKnihy();
    }

    useEffect(() => {
        nacitajKnihy();
    }, []);

    return (
        <>
            <h1>Knihy</h1>
            {
                loading == true ? <p>Načítavam...</p> : (
                    <>
                        {knihy.length == 0 ?
                            <p>Mrzí nás to, no momentálne v systéme nemáme žiadne knihy :(</p>
                            :
                            <Stack spacing={2} padding={2}>
                                {knihy.map(k => (
                                    <KnihaCard key={k.id} kniha={k} autor={k.autor} redirectUrl='/u/admin/knihy' />
                                ))}
                            </Stack>
                        }

                    </>

                )
            }
            <Button
                type="button"
                onClick={addDemoKnihu}
            >Pridať demo knihu</Button>
            <Button
                type="button"
                onClick={deleteDemoKnihu}
            >
                Vymazať demo knihu
            </Button>
            <Button
                component={Link}
                href='/u/admin/knihy/nova'
                variant='contained'
            >Vytvoriť novú knihu</Button>
        </>
    )
}
