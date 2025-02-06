"use client";

import { Button } from '@mui/material';
import React, { useState } from 'react'

export default function DeleteBookButton({ deleteBook }: { deleteBook: () => Promise<void> }) {

    const [deleteCounter, setDeleteCounter] = useState(0);
    
    const handleDelete = async () => {
        if (deleteCounter === 0) {
            setDeleteCounter(1)
            return
        }
        await deleteBook()
    }

    return (
        <Button variant="text" color={deleteCounter === 0 ? "primary" : "warning"} onClick={handleDelete} >{
            deleteCounter === 0 ? "Vymazať" : "Potvrdiť vymazanie"
        }</Button>
    )
}
