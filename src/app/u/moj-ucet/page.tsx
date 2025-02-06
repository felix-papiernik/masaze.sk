"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Stack, TextField, Button, Typography, Select, MenuItem, FormControl, FormLabel, InputLabel, FormHelperText } from "@mui/material";
import { createSession, delay, updatePouzivatel } from "@/lib/actions";
import { validateUpdateUserData } from "@/lib/zod";
import { Auth } from "@/lib/types";
import DeleteUserButton from "./DeleteUserButton";

export default function Page() {

    const { auth, setAuth } = useAuth();
    if (!auth) {
        return null;
    }
    const [pending, setPending] = useState(false);
    const [updated, setUpdated] = useState(false);
    const [userData, setUserData] = useState({
        meno: {
            value: auth?.pouzivatel.meno,
            error: ""
        },
        priezvisko: {
            value: auth?.pouzivatel.priezvisko,
            error: ""
        },
        email: {
            value: auth?.pouzivatel.email,
            error: ""
        }
    });

    console.log(userData);

    const handleUserUpdate = async () => {
        event?.preventDefault();
        setPending(true);
        setUpdated(false);

        await delay(750);
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
            ...auth.pouzivatel,
            meno: userData.meno.value,
            priezvisko: userData.priezvisko.value,
            email: userData.email.value
        })
        setAuth({ ...auth, pouzivatel: newUser });
        await createSession({ pouzivatel: newUser } as Auth);
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
                        value={auth.pouzivatel.je_admin ? "admin" : "citatel"}
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
                        disabled={pending || userData.meno.value === auth?.pouzivatel.meno && userData.priezvisko.value === auth?.pouzivatel.priezvisko && userData.email.value === auth?.pouzivatel.email}
                        variant="contained"
                        sx={{ width: "14rem" }}
                    >
                        {pending ? "Aktualizuje sa..." : "Aktualizovať údaje"}
                    </Button>
                    <DeleteUserButton />
                </Stack>
                {updated && <p>Údaje boli úspešne aktualizované</p>}
            </Stack>
        </div>
    )
}