"use client";

import { IconButton } from '@mui/material';
import React, { useTransition } from 'react'
import { Delete } from '@mui/icons-material';
import { deletePouzivatelovaKniha } from '@/lib/actions';
import { useRouter } from 'next/navigation';

export default function DeleteKnihaPouzivatelButton({ kniha_pouzivatel_id }: { kniha_pouzivatel_id: number }) {

    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    return (
        <IconButton
            onClick={() => startTransition(() => {deletePouzivatelovaKniha(kniha_pouzivatel_id);router.refresh();})}
            disabled={isPending}
        >
            <Delete />
        </IconButton>
    )
}
