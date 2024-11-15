"use client"

import { register } from "module";
import { signup } from "../actions/userController";
import { FormControl, RadioGroup, FormControlLabel, Radio, Box, FormLabel, TextField, Stack, Grid, Button, Typography } from "@mui/material";
import Link from "next/link";
import React, { useActionState } from "react";
import { useState } from "react";
import { Role } from "../types/Role";



export interface User {
    role: Role ,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    phone: string,
}

export interface SignUpForm extends User {
    password2: string,
    adminCode: string,
}

export default function Page() {

    const emptyForm = {
        role: Role.customer,
        email: "",
        password: "",
        password2: "",
        firstName: "",
        lastName: "",
        phone: "",
        adminCode: "",
    }

    const [data, setdata] = useState<SignUpForm>({...emptyForm});

    const [errors, setErrors] = useState<any>({});

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await signup(data);
        if (result.status === 400) {
            setErrors(result.data?.errors ?? {});
        } else {
            // Handle successful signup (e.g., redirect to login page)
            setdata({...emptyForm});
            setErrors({});
        }
    };

    return (
        <Stack direction={"column"} alignItems={"center"}>
            <h1>Registrácia</h1>
            <Box component={"form"} onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2, padding: 2, border: "1px solid grey", borderRadius: 4, maxWidth: { md: "sm" } }}>
                <FormLabel>Registrovať sa ako</FormLabel>

                <RadioGroup
                    aria-label="role"
                    aria-labelledby="role-radio-buttons-group-label"
                    name="role"
                    value={data.role}
                    onChange={(v) => setdata({ ...data, role: v.target.value as Role })}
                    row
                >
                    <FormControlLabel
                        value={Role.customer}
                        control={<Radio />}
                        label="Zákazník"
                    />
                    <FormControlLabel
                        value={Role.masseur}
                        control={<Radio />}
                        label="Masér"
                    />
                </RadioGroup>
                {data.role === Role.masseur && <TextField
                    value={data.adminCode}
                    label={"Administračný kód pre vytvorenie masérstva"}
                    type="text"
                    onChange={(v) => setdata({ ...data, adminCode: v.target.value })}
                    fullWidth
                    autoComplete="off"
                    helperText={errors?.adminCode ?? "Kontaktujte administrátora pre získanie kódu"}
                    error={!!errors?.adminCode}
                />}
                <Grid container spacing={2} columns={2}>
                    <Grid item xs={1}>
                        <TextField
                            value={data.firstName}
                            label={"Meno"}
                            type="text"
                            onChange={(v) => setdata({ ...data, firstName: v.target.value })}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={1}>
                        <TextField
                            value={data.lastName}
                            label={"Priezvisko"}
                            type="text"
                            onChange={(v) => setdata({ ...data, lastName: v.target.value })}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={1}>
                        <TextField
                            value={data.email}
                            label={"Email"}
                            type="email"
                            onChange={(v) => setdata({ ...data, email: v.target.value })}
                            error={!!errors?.email}
                            helperText={errors?.email ?? ""}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={1}>
                        <TextField
                            value={data.phone}
                            label={"Telefónne číslo"}
                            type="tel"
                            onChange={(v) => setdata({ ...data, phone: v.target.value })}
                            fullWidth
                        />
                    </Grid>

                </Grid>
                <TextField
                    value={data.password}
                    label={"Heslo"}
                    type="text"
                    onChange={(v) => setdata({ ...data, password: v.target.value })}
                    autoComplete="off"
                />
                <TextField
                    value={data.password2}
                    label={"Zopakované heslo"}
                    type="text"
                    onChange={(v) => setdata({ ...data, password2: v.target.value })}
                    autoComplete="off"
                />
                <Button variant="contained" color="primary" type="submit">Registrovať</Button>
            </Box>

            <Stack direction="row" spacing={2} justifyContent={"space-between"} pt={1}>
                <Typography>Už máte účet?</Typography>
                <Link href="/login">Prihlásiť sa</Link>
            </Stack>

        </Stack>
    );
}