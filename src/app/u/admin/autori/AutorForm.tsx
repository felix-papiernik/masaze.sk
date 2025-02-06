"use client";

import { createAutor, updateAutor } from "@/lib/actions";
import { validateAutorData } from "@/lib/zod";
import { Box, Button, Stack, TextField } from "@mui/material";
import { autor } from "@prisma/client";
import React, { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/sk";

type props = {
    autorToUpdate?: autor;
};

export default function AutorForm(props: props) {
    const getEmptyFormState = () => ({
        meno: { value: props.autorToUpdate?.meno ?? "", error: "" },
        priezvisko: { value: props.autorToUpdate?.priezvisko ?? "", error: "" },
        info: { value: props.autorToUpdate?.info ?? "", error: "" },
        datum_nar: {
            value: props.autorToUpdate?.datum_nar
                ? dayjs(props.autorToUpdate.datum_nar, "YYYY-MM-DD") // Kvoli spracovaniu datumu prismou
                : dayjs(null),
            error: ""
        },
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
            datum_nar: formState.datum_nar.value.format("YYYY-MM-DD"),
        } as autor;

        const validated = validateAutorData(autorData);
        if (validated.error) {
            setFormState({
                ...formState,
                meno: { value: formState.meno.value, error: validated.error.errors.find((e) => e.path.includes("meno"))?.message || "" },
                priezvisko: { value: formState.priezvisko.value, error: validated.error.errors.find((e) => e.path.includes("priezvisko"))?.message || "" },
                info: { value: formState.info.value, error: validated.error.errors.find((e) => e.path.includes("info"))?.message || "" },
                datum_nar: { value: formState.datum_nar.value, error: validated.error.errors.find((e) => e.path.includes("datum_nar"))?.message || "" },
                error: "Formulár obsahuje chyby",
            });
            return;
        }

        //AJAX
        let res = props.autorToUpdate ? await updateAutor({ ...autorData, id: props.autorToUpdate.id }) : await createAutor(autorData);

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
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="sk">
                <DatePicker
                    label="Dátum narodenia"
                    value={formState.datum_nar.value}
                    onChange={(newDate: Dayjs | null) => {
                        if (newDate) {
                            setFormState((prev) => ({
                                ...prev,
                                datum_nar: { value: newDate, error: "" },
                            }));
                        }
                    }}
                    format="DD.MM.YYYY"
                    slotProps={{
                        textField: {
                            variant: "outlined",
                            fullWidth: true,
                            required: true,
                            error: !!formState.datum_nar.error,
                            helperText: formState.datum_nar.error,
                        }
                    }}
                />
            </LocalizationProvider>
            <TextField name="info" label="Info" value={formState.info.value} onChange={updateField} required multiline minRows={3} />
            <Button type="submit" variant="contained" sx={{ width: "14rem" }}>
                {props.autorToUpdate ? "Aktualizovať" : "Pridať"} autora
            </Button>
            {upserted && <Box sx={{ color: "green" }}>Autor bol {props.autorToUpdate ? "aktualizovaný" : "pridaný"}</Box>}
            {formState.error && <Box sx={{ color: "red" }}>{formState.error}</Box>}
        </Stack>
    );
}
