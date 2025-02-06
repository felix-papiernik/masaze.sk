'use client';

import { createPouzivatel, createSession } from '@/lib/actions';
import { Auth } from '@/lib/types';
import { redirectUrlAfterLogin } from '@/lib/utils';
import { validateCreateUserData } from '@/lib/zod';
import { Box, Typography, Button, TextField } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function Page() {

    const [formState, setFormState] = useState({
        meno: {
            value: '',
            error: ''
        },
        priezvisko: {
            value: '',
            error: ''
        },
        email: {
            value: '',
            error: ''
        },
        heslo: {
            value: '',
            error: ''
        },
        error: '',
        isSubmitting: false
    });


    const router = useRouter();

    const handleSubmit = async () => {
        event?.preventDefault();
        setFormState({ ...formState, isSubmitting: true, error: '' });

        const parsedUser = validateCreateUserData({
            meno: formState.meno.value,
            priezvisko: formState.priezvisko.value,
            email: formState.email.value,
            heslo: formState.heslo.value
        });
        // console.log("CLIENT FORM VALIDATION - registracia")
        if (!parsedUser.success) {
            setFormState({
                ...formState, isSubmitting: false,
                meno: {
                    value: formState.meno.value,
                    error: parsedUser.error.issues?.find(issue => issue.path[0] == "meno")?.message ?? ""
                },
                priezvisko: {
                    value: formState.priezvisko.value,
                    error: parsedUser.error.issues?.find(issue => issue.path[0] == "priezvisko")?.message ?? ""
                },
                email: {
                    value: formState.email.value,
                    error: parsedUser.error.issues?.find(issue => issue.path[0] == "email")?.message ?? ""
                },
                heslo: {
                    value: formState.heslo.value,
                    error: parsedUser.error.issues?.find(issue => issue.path[0] == "heslo")?.message ?? ""
                }
            });
            return;
        }

        const newUser = await createPouzivatel({
            meno: formState.meno.value,
            priezvisko: formState.priezvisko.value,
            email: formState.email.value,
            heslo: formState.heslo.value
        })
        if ("error" in newUser) {
            setFormState({ ...formState, isSubmitting: false, error: newUser.error });
            return;
        }
        await createSession({ pouzivatel: newUser } as Auth);
        router.push(redirectUrlAfterLogin(newUser.je_admin));
    };

    return (
        <Box sx={{ width: { xs: "100%", md: "60vw", lg: "600px" }, mx: "auto" }}>
            <Typography variant="h1" mt={4} mb={2} textAlign={"center"}>Registrácia</Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4, display: "flex", flexDirection: "column", gap: 2 }}>
                <TextField
                    label="Meno"
                    type="text"
                    required
                    error={formState.meno.error !== ""}
                    helperText={formState.meno.error}
                    value={formState.meno.value}
                    onChange={(e) => setFormState({ ...formState, meno: { value: e.target.value, error: formState.meno.error } })}
                />
                <TextField
                    label="Priezvisko"
                    type="text"
                    required
                    error={formState.priezvisko.error !== ""}
                    helperText={formState.priezvisko.error}
                    value={formState.priezvisko.value}
                    onChange={(e) => setFormState({ ...formState, priezvisko: { value: e.target.value, error: formState.priezvisko.error } })}
                />
                <TextField
                    label="Email"
                    type="email"
                    required
                    error={formState.email.error !== ""}
                    helperText={formState.email.error}
                    value={formState.email.value}
                    onChange={(e) => setFormState({ ...formState, email: { value: e.target.value, error: formState.email.error } })}
                />
                <TextField
                    label="Heslo"
                    type="text"
                    required
                    error={formState.heslo.error !== ""}
                    helperText={formState.heslo.error}
                    value={formState.heslo.value}
                    onChange={(e) => setFormState({ ...formState, heslo: { value: e.target.value, error: formState.heslo.error } })}
                />
                <Typography color="error">{formState.error}</Typography>
                <Button type="submit" disabled={formState.isSubmitting} variant="contained">{formState.isSubmitting ? "Registruje sa..." : "Registrovať sa"}</Button>
            </Box>
        </Box>
    )
}
