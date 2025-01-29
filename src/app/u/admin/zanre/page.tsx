import AutoriFilterList from '@/components/layouts/AutorFIlterList';
import ZanreFilterList from '@/components/layouts/ZanreFilterList';
import { deleteDemoKnihaAndRelations, getAutori, getZanre } from '@/lib/actions';
import prisma from '@/lib/prisma';
import { AutorGroupedData, ZanerGroupedData } from '@/lib/types';
import { Typography, Button } from '@mui/material';
import { revalidatePath } from 'next/cache';
import Link from 'next/link';
import React from 'react'

export default async function page() {
    const zanre = (await getZanre()).map(z => ({
        type: 'zaner',
        data: z,
        view: { detailUrl: ("/zanre/" + z.id) },
        edit: {
            editUrl: ("/u/admin/zanre/" + z.id),
            handleDelete: async () => {
                "use server";
                //TODO: delete zaner
            }
        }

    })) as ZanerGroupedData[];
    return (
        <>
            <Typography variant='h1' mb={2}>Žánre</Typography>
            {zanre.length == 0 ?
                <p>Momentálne v systéme nie je žiaden žáner :(</p>
                :
                <ZanreFilterList zanre={zanre} direction='column' />
            }
            <Button
                component={Link}
                href='/u/admin/zanre/novy'
                variant='contained'
                sx={{ mt: zanre.length > 0 ? 2 : 0 }}
            >Pridať nový žáner</Button>
        </>
    )
}
