"use client";

import { createAutor, updateAutor } from "@/lib/actions";
import { validateAutorData } from "@/lib/zod";
import { Box, Button, Stack, TextField } from "@mui/material";
import { autor } from "@prisma/client";
import React, { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

type props = {
    autorToUpdate?: autor;
};

export default function AutorForm(props: props) {
    const getEmptyFormState = () => ({
        meno: { value: props.autorToUpdate?.meno ?? "", error: "" },
        priezvisko: { value: props.autorToUpdate?.priezvisko ?? "", error: "" },
        info: { value: props.autorToUpdate?.info ?? "", error: "" },
        datum_nar: { value: props.autorToUpdate?.datum_nar ?? "1985-06-15", error: "" },
        error: "",
        isSubmitting: false,
    });

    const [formState, setFormState] = useState(getEmptyFormState);
    const [upserted, setUpserted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setUpserted(false);

        let autorData = {
            meno: formState.meno.value,
            priezvisko: formState.priezvisko.value,
            info: formState.info.value,
            datum_nar: formState.datum_nar.value, // Dátum je uložený ako String
        } as autor;

        const validated = validateAutorData(autorData);
        if (validated.error) {
            setFormState({
                ...formState,
                meno: { value: formState.meno.value, error: validated.error.errors.find((e) => e.path.includes("meno"))?.message || "" },
                priezvisko: { value: formState.priezvisko.value, error: validated.error.errors.find((e) => e.path.includes("priezvisko"))?.message || "" },
                info: { value: formState.info.value, error: validated.error.errors.find((e) => e.path.includes("info"))?.message || "" },
                error: "Formulár obsahuje chyby",
            });
            return;
        }

        let res = props.autorToUpdate ? await updateAutor(autorData) : await createAutor(autorData);

        if (res.error) {
            setFormState({
                ...formState,
                error: res.error || "",
            });
            return;
        }

        setUpserted(true);
        if (!props.autorToUpdate) {
            setFormState(getEmptyFormState);
            return;
        }
    };

    const updateField = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormState({
            ...formState,
            [e.target.name]: { value: e.target.value, error: "" },
        });
    };

    return (
        <Stack component={"form"} onSubmit={handleSubmit} direction={"column"} gap={2} padding={2}>
            <TextField name="meno" label="Meno" value={formState.meno.value} onChange={updateField} required />
            <TextField name="priezvisko" label="Priezvisko" value={formState.priezvisko.value} onChange={updateField} required />
            <TextField name="info" label="Info" value={formState.info.value} onChange={updateField} required />

            {/* DatePicker pre dátum narodenia */}
            <DatePicker
                label="Dátum narodenia"
                value={dayjs(formState.datum_nar.value)} // Konverzia zo stringu na dayjs objekt
                onChange={(newDate) => {
                    if (newDate) {
                        setFormState((prev) => ({
                            ...prev,
                            datum_nar: { value: newDate.format("YYYY-MM-DD"), error: "" }, // Uloženie dátumu ako string "YYYY-MM-DD"
                        }));
                    }
                }}
                slotProps={{ textField: { variant: "outlined", fullWidth: true, required: true } }}
            />

            <Button type="submit" variant="contained" sx={{ width: "14rem" }}>
                {props.autorToUpdate ? "Aktualizovať" : "Pridať"} autora
            </Button>
            {upserted && <Box sx={{ color: "green" }}>Autor bol {props.autorToUpdate ? "aktualizovaný" : "pridaný"}</Box>}
            {formState.error && <Box sx={{ color: "red" }}>{formState.error}</Box>}
        </Stack>
    );
}
