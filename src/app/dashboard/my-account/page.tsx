"use client";

import { deleteUser, updateUser } from "@/lib/actions";
import { validateupdateUserData } from "@/lib/zodValidations";
import { Box, TextField, Button } from "@mui/material";
import { signOut } from "next-auth/react";
import React, { useState } from "react";

export default function Page() {

    const [isDeleting, setIsDeleting] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    async function handleDeleteUser(event: React.FormEvent<HTMLFormElement>) {
        setIsDeleting(true);
        event.preventDefault();

        const restext = await deleteUser(35);
        setIsDeleting(false);

        alert(restext.message);
        if (restext.success) {
            await signOut();
        }
    }

    async function handleUpdateUser(event: React.FormEvent<HTMLFormElement>) {

        setIsUpdating(true);
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const parsedupdateUser = validateupdateUserData({
            firstName: formData.get("firstName") as string,
            lastName: formData.get("lastName") as string
        });

        console.log("validacia na strane klienta")

        if (!parsedupdateUser.success) {
            alert("Nepodarilo sa aktualizovať údaje");
            return;
        } else {
            await updateUser(21, formData.get("firstName") as string, formData.get("lastName") as string);
            //revalidatePath("/dashboard");
        }
        setIsUpdating(false);
    }

    return (
        <div>
            <h1>Môj účet</h1>
            <Box component="form" onSubmit={handleUpdateUser} sx={{ my: 4, display: "flex", flexDirection: "column", gap: 2 }}>
                <TextField
                    label="Meno"
                    name="firstName"
                    type="text"
                    required
                />
                <TextField
                    label="Priezvisko"
                    name="lastName"
                    type="text"
                    required
                />
                <Button type="submit" disabled={isUpdating} variant="contained">{isUpdating ? "Aktualizuje sa..." : "Aktualizovať"}</Button>
            </Box>
            <Box component="form" onSubmit={handleDeleteUser} mb={4}>
                <Button type="submit" disabled={isDeleting} variant="contained">{isDeleting ? "Vymazáva sa..." : "Vymazať účet"}</Button>
            </Box>
        </div>
    )
}