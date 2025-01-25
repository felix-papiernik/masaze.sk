"use client";

import { addDemoKnihaAndRelations, deleteDemoKnihaAndRelations, getKnihy } from '@/lib/actions';
import { Button } from '@mui/material';
import { kniha } from '@prisma/client';
import React, { useEffect, useState } from 'react'

export default function Knihy() {
    //const vsetkyKnihy = await getKnihy()
    const [knihy, setKnihy] = useState<kniha[]>([]);
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
            <h1>Knihy</h1>{
                loading == true ? <p>Načítavam...</p> : (
                    <>
                        {knihy.length == 0 &&
                            <p>Mrzí nás to, no momentálne v systéme nemáme žiadne knihy :(</p>}
                        <ul>{
                            knihy.map(k => (
                                <li key={k.id}>{k.nazov}, počet strán: {k.pocet_stran}</li>
                            ))
                        }</ul>

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
        </>
    )
}
