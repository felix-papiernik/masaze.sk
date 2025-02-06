"use client";

import { updatePouzivatel, createSession } from '@/lib/actions';
import { Auth } from '@/lib/types';
import { validateUpdateUserData } from '@/lib/zod';
import { Typography, Stack, TextField, FormControl, InputLabel, Select, MenuItem, FormHelperText, Button } from '@mui/material';
import React, { useState } from 'react'
import DeleteUserButton from './DeleteUserButton';
import { useRouter } from 'next/navigation';
import { pouzivatel } from '@prisma/client';

export default function MyAccountForm({ pouzivatel }: { pouzivatel: pouzivatel }) {

    const router = useRouter()
    const [pending, setPending] = useState(false);
    const [updated, setUpdated] = useState(false);
    const [userData, setUserData] = useState({
        meno: {
            value: pouzivatel.meno,
            error: ""
        },
        priezvisko: {
            value: pouzivatel.priezvisko,
            error: ""
        },
        email: {
            value: pouzivatel.email,
            error: ""
        }
    });

    console.log(userData);

    const handleUserUpdate = async () => {
        event?.preventDefault();
        setPending(true);
        setUpdated(false);

        const zValidatedData = validateUpdateUserData({
            meno: userData.meno.value,
            priezvisko: userData.priezvisko.value,
            email: userData.email.value
        });
        if (zValidatedData.error) {
            setUserData({
                ...userData,
                meno: { value: userData.meno.value, error: zValidatedData.error.errors.find(e => e.path.includes('firstName'))?.message || '' },
                priezvisko: { value: userData.priezvisko.value, error: zValidatedData.error.errors.find(e => e.path.includes('priezvisko'))?.message || '' },
                email: { value: userData.email.value, error: zValidatedData.error.errors.find(e => e.path.includes('email'))?.message || '' },
            });
            setPending(false);
            return;
        }
        
        const newUser = await updatePouzivatel({
            ...pouzivatel,
            meno: userData.meno.value,
            priezvisko: userData.priezvisko.value,
            email: userData.email.value
        })

        await createSession({ pouzivatel: newUser } as Auth);
        router.refresh();
        setUpdated(true);
        setPending(false);
    }

    return (
        <div>
            <Typography variant="h3" mb={4}>Môj účet</Typography>
            <Stack component="form" onSubmit={handleUserUpdate} mb={4} direction={"column"} gap={2}>
                <TextField
                    variant='outlined'
                    label='Meno'
                    value={userData.meno.value}
                    onChange={(e) => setUserData({ ...userData, meno: { value: e.target.value, error: userData.meno.error } })}
                    required
                    helperText={userData.meno.error}
                    error={!!userData.meno.error}
                />
                <TextField
                    variant='outlined'
                    label='Priezvisko'
                    value={userData.priezvisko.value}
                    onChange={(e) => setUserData({ ...userData, priezvisko: { value: e.target.value, error: userData.priezvisko.error } })}
                    required
                    helperText={userData.priezvisko.error}
                    error={!!userData.priezvisko.error}
                />
                <TextField
                    variant='outlined'
                    label='Email'
                    value={userData.email.value}
                    onChange={(e) => setUserData({ ...userData, email: { value: e.target.value, error: userData.email.error } })}
                    required
                    helperText={userData.email.error}
                    error={!!userData.email.error}
                />
                <FormControl variant="outlined">
                    <InputLabel id="rola">Roľa</InputLabel>
                    <Select
                        labelId="rola"
                        label="Roľa"
                        variant="outlined"
                        value={pouzivatel.je_admin ? "admin" : "citatel"}
                        disabled
                        sx={{ width: "14rem" }}
                    >
                        <MenuItem value="admin">Admin</MenuItem>
                        <MenuItem value="citatel">Čitateľ</MenuItem>
                    </Select>
                    <FormHelperText>Kontaktujte správcu pre zmenu role</FormHelperText>
                </FormControl>
                <Stack direction={"row"} gap={2}>
                    <Button
                        type="submit"
                        disabled={pending || userData.meno.value === pouzivatel.meno && userData.priezvisko.value === pouzivatel.priezvisko && userData.email.value === pouzivatel.email}
                        variant="contained"
                        sx={{ width: "14rem" }}
                    >
                        {pending ? "Aktualizuje sa..." : "Aktualizovať údaje"}
                    </Button>
                    <DeleteUserButton userId={pouzivatel.id} />
                </Stack>
                {updated && <p>Údaje boli úspešne aktualizované</p>}
            </Stack>
        </div>
    )
}
