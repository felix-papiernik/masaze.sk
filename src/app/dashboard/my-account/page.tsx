

import { Button } from "@mui/material";
import React, {  } from "react";
import { auth } from "../../../../auth";
import UserDataForm from "./UserDataForm";
import prisma from "@/lib/prisma";
import DeleteUserButton from "./DeleteUserButton";

export default async function Page() {

    const session = await auth();
    if (!session) {
        return Response.redirect("/prihlasenie");
    }

    const userId = Number(session?.user?.id);
    console.log("user id je: " + userId);
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    }).catch((error) => {
        console.error(error);
    }).then((user) => {
        return user;
    });

    let initialState = {
        id: userId,
        firstName: user!.firstName,
        lastName: user!.lastName,
        email: user!.email,
        phone: user!.phone,
        password: user!.password
    }

    return (
        <div>
            <h1>Môj účet</h1>
            <UserDataForm user={initialState}/>
            <DeleteUserButton id={userId}/>
        </div>
    )
}




/*
<Box component="form" onSubmit={handleDeleteUser} mb={4}>
                <Button
                    type="submit"
                    disabled={isDeleting}
                    variant="contained">
                    {isDeleting ? "Vymazáva sa..." : "Vymazať účet"}
                </Button>
            </Box>
*/



/*

"use client";

import { deleteUser, updateUser } from "@/lib/actions";
import { validateupdateUserData } from "@/lib/zodValidations";
import { Box, TextField, Button } from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import React, { useState } from "react";
import { auth } from "../../../../auth";

export default async function Page() {

    //const { data: session } = useSession();
    const session = await auth();
    if (!session) {
        return Response.redirect("/prihlasenie");
    }
    const [isDeleting, setIsDeleting] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    async function handleDeleteUser(event: React.FormEvent<HTMLFormElement>) {
        setIsDeleting(true);
        event.preventDefault();

        const restext = await deleteUser(Number(session?.user?.id));
        // const restext = await deleteUser(35);
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
            <Box component="form" onSubmit={handleDeleteUser} mb={4}>
                <Button
                    type="submit"
                    disabled={isDeleting}
                    variant="contained">
                    {isDeleting ? "Vymazáva sa..." : "Vymazať účet"}
                </Button>
            </Box>
        </div>
    )
}

*/









/*
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
*/