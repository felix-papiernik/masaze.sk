"use client";

import { useAuth } from '@/context/AuthContext';
import { Button, Typography } from '@mui/material';
import React from 'react'

export default function AddToListButton() {

    const { auth } = useAuth();

    return (
        auth ? <Button variant="contained">Pridať do zoznamu</Button> : <span>NoAuth</span>
    )
}
