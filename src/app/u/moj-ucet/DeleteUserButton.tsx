"use client";

import CustomSnackbar from '@/components/CustomSnackbar';
import { useAuth } from '@/context/AuthContext';
import { deletePouzivatel, deleteSession } from '@/lib/actions';
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material'
import { redirect } from 'next/navigation';
import React, { useState } from 'react'

export default function DeleteUserButton() {

    const {auth, setAuth} = useAuth();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [snackbarData, setSnackbarData] = useState({ open: false, message: "" });
    const [isDeleting, setIsDeleting] = useState(false);

    const handleClose = () => {
        setDialogOpen(false);
    };

    const handleDeleteUser = async () => {
        try {
            setIsDeleting(true);
            //const deletedSuccessfully = await deletePouzivatel(auth!.pouzivatel.id);
            const deletedSuccessfully = true
    
            if (deletedSuccessfully) {
                await deleteSession(false);
                setAuth(null);
                setSnackbarData({ open: true, message: "Účet bol úspešne vymazaný." });
                redirect("/prihlasenie");
            } else {
                setSnackbarData({ open: true, message: "Účet sa nepodarilo vymazať." });
            }
        } catch (error) {
            console.error("Error deleting user:", error);
            setSnackbarData({ open: true, message: "An error occurred. Please try again." });
        } finally {
            setIsDeleting(false);
            setDialogOpen(false);
        }
    }

    return (
        <>
            <Button
                disabled={isDeleting}
                onClick={() => setDialogOpen(true)}
                type="button"
                variant="outlined"
            >
                Vymazať účet
            </Button>
            <Dialog open={dialogOpen} onClose={handleClose}>
                <DialogTitle>Naozaj chcete vymazať svoj účet? NEZMAZE SA NAOZAJ</DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose}>Nie</Button>
                    <Button onClick={handleDeleteUser} autoFocus>
                        Áno
                    </Button>
                </DialogActions>
            </Dialog>
            <CustomSnackbar {...snackbarData} setOpen={(open) => setSnackbarData(prev => ({ ...prev, open }))} />
        </>
    )
}
