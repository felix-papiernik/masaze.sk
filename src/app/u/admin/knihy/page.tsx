import KnihyFilterList from '@/components/layouts/KnihyFilterList';
import { deleteKniha, getKnihy } from '@/lib/actions';
import { EntityGroupedData, KnihaGroupedData } from '@/lib/types';
import { Button, Typography } from '@mui/material';
import { revalidatePath } from 'next/cache';
import Link from 'next/link';
import React, {  } from 'react'

export default async function Knihy() {

    const knihy = await getKnihy();
    const knihyGrupedData = knihy.map(k => ({
        type: 'kniha',
        data: k,
        view: { detailUrl: ("/knihy/" + k.id) },
        edit: {
            editUrl: ("/u/admin/knihy/" + k.id),
            handleDelete: async () => {
                "use server";
                await deleteKniha(k.id);
                revalidatePath("/u/admin");
            }
        }
    })) as EntityGroupedData[];

    return (
        <>
            <Typography variant='h1' mb={2}>Knihy</Typography>
            {knihy.length == 0 ?
                <p>Momentálne v systéme nie sú žiadne knihy :(</p>
                :
                <KnihyFilterList knihy={knihyGrupedData as KnihaGroupedData[]} direction='column'/>
            }
            <Button
                component={Link}
                href='/u/admin/knihy/nova'
                variant='contained'
                sx={{ mt: knihy.length > 0 ? 2 : 0 }}
            >Vytvoriť novú knihu</Button>
        </>
    )
}
