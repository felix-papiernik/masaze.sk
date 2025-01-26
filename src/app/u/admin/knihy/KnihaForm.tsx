"use client";

import { createKniha, updateKniha } from '@/lib/actions';
import prisma from '@/lib/prisma'
import { Autocomplete, Box, Button, FormControl, Stack, TextField } from '@mui/material';
import { autor, kniha, zaner } from '@prisma/client';
import { error } from 'console';
import React, { useState } from 'react'

type props = {
    kniha?: kniha
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
        nazov: { value: "", error: "" },
        autor_id: { value: -1, error: "" },
        rok: { value: "", error: "" },
        zaner_id: { value: -1, error: "" },
        pocet_stran: { value: "", error: "" },
        error: "",
        isSubmitting: false,
    })
    const [formState, setFormState] = useState(getEmptyFormState);
    const [added, setAdded] = useState(false);

    const [autor, setAutor] = useState<{
        autorId: number | null,
        inputValue: string
    }>({ autorId: null, inputValue: "" });

    const [zaner, setZaner] = useState<{
        id: number | null,
        inputValue: string
    }>({ id: null, inputValue: "" });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formState.nazov.value === "" || autor.autorId === null || zaner.id === null || formState.rok.value === "" || formState.pocet_stran.value === "") {
            setFormState({
                ...formState,
                error: "Vyplňte všetky polia"
            });
            return;
        }
        const d = {
            nazov: formState.nazov.value,
            autor_id: autor.autorId,
            zaner_id: zaner.id,
            rok_vydania: parseInt(formState.rok.value),
            pocet_stran: parseInt(formState.pocet_stran.value)
        } as kniha;


        let res = props.kniha ? await updateKniha(d) : await createKniha(d);

        if ("error" in res === false) {
            props.kniha && setAdded(true);
            //props.kniha && setAdded(false);
            setFormState(getEmptyFormState);
            return;
        }
        setFormState({
            ...formState,
            error: res.error
        });
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
                required
            />
            <TextField
                type='number'
                name="pocet_stran"
                label="Počet strán"
                value={formState.pocet_stran.value}
                onChange={updateField}
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
                //getOptionKey={(option) => option.id}
                renderInput={(params) => <TextField {...params} label="Autor *" />}
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
                renderInput={(params) => <TextField {...params} label="Žáner *" />}
                noOptionsText="Nenašiel sa žiaden žáner"
            />
            <>
                <Button type="submit" variant="contained" sx={{ width: "14rem" }}>{props.kniha ? "Aktualizovať" : "Pridať"} knihu</Button>
                {added && <Box sx={{ color: "green" }}>Kniha bola pridaná</Box>}
                {formState.error && <Box sx={{ color: "red" }}>{formState.error}</Box>}
            </>
        </Stack>
    )
}
