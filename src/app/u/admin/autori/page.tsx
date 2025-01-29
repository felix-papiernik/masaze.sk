import AutoriFilterList from '@/components/layouts/AutorFIlterList';
import { deleteDemoKnihaAndRelations, getAutori } from '@/lib/actions';
import prisma from '@/lib/prisma';
import { AutorGroupedData } from '@/lib/types';
import { Typography, Button } from '@mui/material';
import Link from 'next/link';
import React from 'react'

export default async function Autori() {
    const autori = (await getAutori()).map(a => ({
        type: 'autor',
        data: a,
        view: { detailUrl: ("/autori/" + a.id) },
        edit: {
            editUrl: ("/u/admin/autori/" + a.id),
            handleDelete: async () => {
                "use server";
                //TODO: delete autor
                await prisma.autor.delete({
                    where: {
                        id: a.id
                    }
                })
            }
        }

    })) as AutorGroupedData[];

    return (
        <>
            <Typography variant='h1' mb={2}>Autori</Typography>
            {autori.length == 0 ?
                <p>Momentálne v systéme nie je žiaden autor :(</p>
                :
                <AutoriFilterList autori={autori} direction='column' />
            }
            <Button
                component={Link}
                href='/u/admin/autori/novy'
                variant='contained'
                sx={{ mt: autori.length > 0 ? 2 : 0 }}
            >Pridať nového autora</Button>
        </>
    )
}
