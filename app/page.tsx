"use client"

import { FormControl, RadioGroup, FormControlLabel, Radio, Box, FormLabel, TextField, Stack, Grid, Button, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";
import { useState } from "react";

export default function Page() {

    const enum Role {
        customer = "zákazník",
        masseur = "masér"
    }

    const [data, setdata] = useState({
        role: Role.customer,
        email: "",
        password: "",
        password2: "",
        firstName: "",
        lastName: "",
        phone: "",
        adminCode: "",
    });

    console.log(data)

    return (
        <Stack direction={"column"} alignItems={"center"}>
            <h1>Registrácia</h1>
            <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2, p: 2, border: "1px solid grey", borderRadius: 4, maxWidth: { md: "sm" } }}>
                <FormControl>
                    <FormLabel>Registrovať sa ako</FormLabel>
                    <RadioGroup
                        aria-label="role"
                        aria-labelledby="role-radio-buttons-group-label"
                        value={data.role}
                        onChange={(event) => setdata({ ...data, role: event.target.value as Role })}
                        name="role-radio-buttons-group"
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
                </FormControl>
                {data.role === Role.masseur && <TextField
                    value={data.adminCode}
                    label={"Administračný kód pre vytvorenie masérstva"}
                    type="text"
                    onChange={(v) => setdata({ ...data, adminCode: v.target.value })}
                    fullWidth
                    autoComplete="off"
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
                <Button variant="contained" color="primary" onClick={() => console.log(data)}>Registrovať</Button>
            </Box>
            <Stack direction="row" spacing={2} justifyContent={"space-between"} pt={1}>
                <Typography>Už máte účet?</Typography>
                <Link href="/login">Prihlásiť sa</Link>
            </Stack>
        </Stack>
    );
}
