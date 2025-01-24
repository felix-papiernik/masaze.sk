"use client";

import CustomSnackbar from '@/components/CustomSnackbar';
import { deleteUser } from '@/lib/actions';
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material'
import React, { useState } from 'react'

export default function DeleteUserButton({ id }: { id: number }) {

    const [dialogOpen, setDialogOpen] = useState(false);
    const [snackbarData, setSnackbarData] = useState({ open: false, message: "" });
    const [isDeleting, setIsDeleting] = useState(false);

    const handleClose = () => {
        setDialogOpen(false);
    };

    const handleDeleteUser = async () => {
        try {
            setIsDeleting(true);
            const response = await deleteUser(id);
    
            if (response.success) {
                //await signOutUser();
            } else {
                setSnackbarData({ open: true, message: "Failed to delete account. Try again." });
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
                variant="contained"
                sx={{ marginBottom: 2 }}
            >
                Vymazať účet
            </Button>
            <Dialog open={dialogOpen} onClose={handleClose}>
                <DialogTitle>Naozaj chcete vymazať svoj účet?</DialogTitle>
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
