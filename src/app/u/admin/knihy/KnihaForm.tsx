"use client";

import { createKniha, updateKniha } from '@/lib/actions';
import prisma from '@/lib/prisma'
import { validateKnihaData } from '@/lib/zod';
import { Autocomplete, Box, Button, FormControl, Stack, TextField } from '@mui/material';
import { autor, kniha, zaner } from '@prisma/client';
import { error } from 'console';
import React, { useState } from 'react'

type props = {
    knihaToUpdate?: kniha
    autori: autor[]
    zanre: zaner[]
}

/**
 * formular na pridanie knihy
 * errory ku fieldom
 * 
 * po pridani vymazat formular
 */
export default function KnihaForm(props: props) {
    const getEmptyFormState = () => ({
        nazov: { value: props.knihaToUpdate?.nazov ?? "", error: "" },
        // autor_id: { value: props.knihaToUpdate?.autor_id ?? -1, error: "" },
        rok: { value: props.knihaToUpdate?.rok_vydania ?? "", error: "" },
        // zaner_id: { value: props.knihaToUpdate?.zaner_id ?? -1, error: "" },
        pocet_stran: { value: props.knihaToUpdate?.pocet_stran || "", error: "" },
        error: "",
        isSubmitting: false,
    })

    //todo remove zaner completely, merge autor to formState
    //todo add pridat-autora button that triggers modal with autor form
    const [formState, setFormState] = useState(getEmptyFormState);
    const [upserted, setUpserted] = useState(false);

    const [autor, setAutor] = useState<{
        autorId: number | null,
        inputValue: string
        error: string
    }>({ autorId: props.knihaToUpdate?.autor_id ?? null, inputValue: props.knihaToUpdate?.autor_id.toString() ?? "", error: "" });

    const [zaner, setZaner] = useState<{
        id: number | null,
        inputValue: string
        error: string
    }>({ id: props.knihaToUpdate?.zaner_id ?? null, inputValue: props.knihaToUpdate?.zaner_id?.toString() ?? "", error: "" });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setUpserted(false);

        if (autor.autorId === null || zaner.id === null) {
            autor.autorId === null && setAutor({ ...autor, error: "Vyberte autora" });
            zaner.id === null && setZaner({ ...zaner, error: "Vyberte žáner" });
            zaner.id === null || autor.autorId === null && setFormState({ ...formState, error: "Formulár obsahuje chyby" });
            return;
        }

        let knihaData = {
            nazov: formState.nazov.value,
            autor_id: autor.autorId,
            zaner_id: zaner.id,
            rok_vydania: parseInt(formState.rok.value.toString()),
            pocet_stran: parseInt(formState.pocet_stran.value.toString())
        } as kniha;
        props.knihaToUpdate && (knihaData.id = props.knihaToUpdate.id);
        console.log("knihaData", knihaData);
        const validated = validateKnihaData(knihaData);
        if (validated.error) {
            console.log("autor_id error", validated.error.errors.find(e => e.path.includes("autor_id"))?.message);
            setFormState({
                ...formState,
                nazov: { value: formState.nazov.value, error: validated.error.errors.find(e => e.path.includes("nazov"))?.message || "" },
                rok: { value: formState.rok.value, error: validated.error.errors.find(e => e.path.includes("rok_vydania"))?.message || "" },
                pocet_stran: { value: formState.pocet_stran.value, error: validated.error.errors.find(e => e.path.includes("pocet_stran"))?.message || "" },
                error: "Formulár obsahuje chyby"
            });
            setAutor({ ...autor, error: validated.error.errors.find(e => e.path.includes("autor_id"))?.message || "" });
            setZaner({ ...zaner, error: validated.error.errors.find(e => e.path.includes("zaner_id"))?.message || "" });
            return;
        }

        let res = props.knihaToUpdate ? await updateKniha(knihaData) : await createKniha(knihaData);

        if (res.error) {
            setFormState({
                ...formState,
                error: res.error || ""
            });
            return;
        }


        setUpserted(true);
        if (props.knihaToUpdate === undefined) {
            setFormState(getEmptyFormState);
            setAutor({
                autorId: null,
                inputValue: "",
                error: ""
            });
            setZaner({
                id: null,
                inputValue: "",
                error: ""
            });
            return;
        }
        props.knihaToUpdate && setZaner({ ...zaner, error: "" });
        props.knihaToUpdate && setAutor({ ...autor, error: "" });
    }

    const updateField = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormState({
            ...formState,
            [e.target.name]: { value: e.target.value, error: "" }
        });
    }

    return (
        <Stack component={"form"} onSubmit={handleSubmit} direction={"column"} gap={2} padding={2}>
            <TextField
                name="nazov"
                label="Názov knihy"
                value={formState.nazov.value}
                onChange={updateField}
                required
            />
            <TextField
                type='number'
                name="rok"
                label="Rok vydania"
                value={formState.rok.value}
                onChange={updateField}
                helperText={formState.rok.error}
                error={!!formState.rok.error}
                required
            />
            <TextField
                type='number'
                name="pocet_stran"
                label="Počet strán"
                value={formState.pocet_stran.value}
                onChange={updateField}
                helperText={formState.pocet_stran.error}
                error={!!formState.pocet_stran.error}
                required
            />
            <Autocomplete
                disablePortal
                value={props.autori.find(a => a.id === autor.autorId) || null}
                onChange={(event, newValue) => {
                    setAutor({
                        ...autor,
                        autorId: newValue?.id || null
                    });
                }}
                inputValue={autor.inputValue}
                onInputChange={(event, newInputValue) => {
                    setAutor({
                        ...autor,
                        inputValue: newInputValue
                    });
                }}
                options={props.autori}
                getOptionLabel={(option) => option.meno + " " + option.priezvisko}
                getOptionKey={(option) => option.id}
                renderInput={(params) => <TextField
                    {...params}
                    label="Autor"
                    error={!!autor.error}
                    helperText={autor.error}
                    required
                />}
                noOptionsText="Nenašiel sa žiaden autor"
            />
            <Autocomplete
                disablePortal
                value={props.zanre.find(z => z.id === zaner.id) || null}
                onChange={(_, newValue) => {
                    setZaner({
                        ...zaner,
                        id: newValue?.id || null
                    });
                }}
                inputValue={zaner.inputValue}
                onInputChange={(_, newInputValue) => {
                    setZaner({
                        ...zaner,
                        inputValue: newInputValue
                    });
                }}
                options={props.zanre}
                getOptionLabel={(option) => option.nazov}
                getOptionKey={(option) => option.id}
                renderInput={(params) => <TextField
                    {...params}
                    label="Žáner"
                    helperText={zaner.error}
                    error={!!zaner.error}
                    required
                />}
                noOptionsText="Nenašiel sa žiaden žáner"
            />
            <>
                <Button type="submit" variant="contained" sx={{ width: "14rem" }}>{props.knihaToUpdate ? "Aktualizovať" : "Pridať"} knihu</Button>
                {upserted && <Box sx={{ color: "green" }}>Kniha bola {props.knihaToUpdate ? "aktualizovaná" : "pridaná"} </Box>}
                {formState.error && <Box sx={{ color: "red" }}>{formState.error}</Box>}
            </>
        </Stack>
    )
}
