import { IconButton } from '@mui/material';
import React from 'react'
import { Delete } from '@mui/icons-material';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export default function DeleteKnihaPouzivatelButton({ kniha_pouzivatel_id }: { kniha_pouzivatel_id: number }) {

    async function handleDelete() {
        "use server";
        await prisma.kniha_pouzivatel.delete({ where: { id: kniha_pouzivatel_id } });
        revalidatePath("/u/moje-knihy");
    }

    return (
        <IconButton onClick={handleDelete}>
            <Delete />
        </IconButton>
    )
}
