"use client";

import { useAuth } from '@/context/AuthContext';
import { stav } from '@prisma/client';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, IconButton, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import { insertPouzivatelovaKniha } from '@/lib/actions';
import { Add } from '@mui/icons-material';

export default function AddToListButton({ kniha_id }: { kniha_id: number }) {

    const { auth } = useAuth();

    //there's no performance or memory issue with generating modal for each button
    //because it's not rendered until the button is clicked
    const [open, setOpen] = useState(false);
    type FormStateType = {
        poznamka: string,
        stav: stav,
        error: string
    }
    const getEmptyFormState = (): FormStateType => { return { poznamka: "", stav: stav.chcemPrecitat, error: "" } }
    const [formState, setFormState] = useState<FormStateType>(getEmptyFormState());

    const handleClose = () => {
        setOpen(false);
        setFormState(getEmptyFormState())
    }

    const handleAdd = async () => {
        const res = await insertPouzivatelovaKniha({
            kniha_id: kniha_id,
            pouzivatel_id: auth!.pouzivatel.id,
            poznamka: formState.poznamka,
            stav: formState.stav as stav
        })
        res.error && setFormState({ ...formState, error: res.error });
        res.error === undefined && setOpen(false);
    }


    return (
        auth ? <>
            <IconButton onClick={() => setOpen(!open)} size="small" color="primary"><Add /></IconButton>
            {open && (
                <Dialog open={open} onClose={handleClose} fullWidth>
                    <DialogTitle>Pridať knihu do zoznamu</DialogTitle>
                    <DialogContent>
                        <FormControl sx={{ mt: 1, minWidth: "12rem" }} required>
                            <InputLabel id="stavLabel">Vyber zoznam kníh</InputLabel>
                            <Select
                                labelId="stavLabel"
                                id="demo-simple-select-error"
                                value={formState.stav}
                                label="Vyber zoznam kníh"
                                onChange={(e) => setFormState({ ...formState, stav: e.target.value as stav })}
                                required
                            >
                                <MenuItem value={stav.chcemPrecitat}>Na prečítanie</MenuItem>
                                <MenuItem value={stav.precitane}>Už prečítané</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            label="Poznámka ku knihe"
                            value={formState.poznamka}
                            onChange={(e) => setFormState({ ...formState, poznamka: e.target.value })}
                            multiline
                            minRows={2}
                            fullWidth
                            sx={{ mt: 2 }}
                        />
                        <Typography variant='body2' color='error'>{formState.error}</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Zrušiť</Button>
                        <Button onClick={handleAdd}>Pridať</Button>
                    </DialogActions>
                </Dialog>
            )}

        </> : <span>NoAuth</span>
    )
}
