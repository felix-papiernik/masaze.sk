"use client";

import { Box, Button, Stack, TextField } from "@mui/material";
import { zaner } from "@prisma/client";
import React, { useState } from "react";
import "dayjs/locale/sk";
import { validateZanerData } from "@/lib/zod";
import { createZaner, updateZaner } from "@/lib/actions";

type props = {
    zanerToUpdate?: zaner;
};

export default function ZanerForm(props: props) {
    const getEmptyFormState = () => ({
        nazov: { value: props.zanerToUpdate?.nazov ?? "", error: "" },
        popis: { value: props.zanerToUpdate?.popis ?? "", error: "" },
        error: "",
        isSubmitting: false,
    });

    const [formState, setFormState] = useState(getEmptyFormState);
    const [upserted, setUpserted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setUpserted(false);

        let zanerData = {
            nazov: formState.nazov.value,
            popis: formState.popis.value,
        } as zaner;

        const validated = validateZanerData(zanerData);
        if (validated.error) {
            setFormState({
                ...formState,
                nazov: { value: formState.nazov.value, error: validated.error.errors.find((e) => e.path.includes("nazov"))?.message || "" },
                popis: { value: formState.popis.value, error: validated.error.errors.find((e) => e.path.includes("popis"))?.message || "" },
                error: "Formulár obsahuje chyby",
            });
            return;
        }

        let res = props.zanerToUpdate ? await updateZaner({ ...zanerData, id: props.zanerToUpdate.id }) : await createZaner(zanerData);

        if (res.error) {
            setFormState({
                ...formState,
                error: res.error || "",
            });
            return;
        }

        setUpserted(true);
        if (!props.zanerToUpdate) {
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
            <TextField name="nazov" label="Názov" value={formState.nazov.value} onChange={updateField} required />            
            <TextField name="popis" label="Popis žánru" value={formState.popis.value} onChange={updateField} required multiline minRows={3} />
            <Button type="submit" variant="contained" sx={{ width: "14rem" }}>
                {props.zanerToUpdate ? "Aktualizovať" : "Pridať"} žáner
            </Button>
            {upserted && <Box sx={{ color: "green" }}>Žáner bol {props.zanerToUpdate ? "aktualizovaný" : "pridaný"}</Box>}
            {formState.error && <Box sx={{ color: "red" }}>{formState.error}</Box>}
        </Stack>
    );
}
