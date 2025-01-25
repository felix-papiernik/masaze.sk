"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Stack, TextField, Button } from "@mui/material";
import { createSession, delay, updatePouzivatel } from "@/lib/actions";
import { validateUpdateUserData } from "@/lib/zod";
import { Auth } from "@/lib/types";

export default function Page() {

    const { auth, setAuth } = useAuth();
    if (!auth) {
        return null;
    }
    const [pending, setPending] = useState(false);
    const [updated, setUpdated] = useState(false);
    const [userData, setUserData] = useState({
        meno: {
            value: auth?.pouzivatel.meno,
            error: ""
        },
        priezvisko: {
            value: auth?.pouzivatel.priezvisko,
            error: ""
        },
        email: {
            value: auth?.pouzivatel.email,
            error: ""
        }
    });

    console.log(userData);

    const handleUserUpdate = async () => {
        event?.preventDefault();
        setPending(true);
        setUpdated(false);

        await delay(750);
        const zValidatedData = validateUpdateUserData({
            meno: userData.meno.value,
            priezvisko: userData.priezvisko.value,
            email: userData.email.value
        });
        if (zValidatedData.error) {
            setUserData({
                ...userData,
                meno: { value: userData.meno.value, error: zValidatedData.error.errors.find(e => e.path.includes('firstName'))?.message || '' },
                priezvisko: { value: userData.priezvisko.value, error: zValidatedData.error.errors.find(e => e.path.includes('priezvisko'))?.message || '' },
                email: { value: userData.email.value, error: zValidatedData.error.errors.find(e => e.path.includes('email'))?.message || '' },
            });
            setPending(false);
            return;
        }
        const newUser = await updatePouzivatel({
            ...auth.pouzivatel,
            meno: userData.meno.value,
            priezvisko: userData.priezvisko.value,
            email: userData.email.value
        })
        setAuth({ ...auth, pouzivatel: newUser });
        await createSession({ pouzivatel: newUser } as Auth);
        setUpdated(true);
        setPending(false);
    }

    return (
        <div>
            <h1>Môj účet role {auth?.pouzivatel.je_admin ? "admin" : "čitateľ"}</h1>
            <Stack component="form" onSubmit={handleUserUpdate} mb={4} direction={"column"} gap={2}>
                <TextField
                    variant='outlined'
                    label='Meno'
                    value={userData.meno.value}
                    onChange={(e) => setUserData({ ...userData, meno: { value: e.target.value, error: userData.meno.error } })}
                    required
                    helperText={userData.meno.error}
                    error={!!userData.meno.error}
                />
                <TextField
                    variant='outlined'
                    label='Priezvisko'
                    value={userData.priezvisko.value}
                    onChange={(e) => setUserData({ ...userData, priezvisko: { value: e.target.value, error: userData.priezvisko.error } })}
                    required
                    helperText={userData.priezvisko.error}
                    error={!!userData.priezvisko.error}
                />
                <TextField
                    variant='outlined'
                    label='Email'
                    value={userData.email.value}
                    onChange={(e) => setUserData({ ...userData, email: { value: e.target.value, error: userData.email.error } })}
                    required
                    helperText={userData.email.error}
                    error={!!userData.email.error}
                />
                <Stack direction={"row"} gap={2}>
                    <Button
                        type="submit"
                        disabled={pending || userData.meno.value === auth?.pouzivatel.meno && userData.priezvisko.value === auth?.pouzivatel.priezvisko && userData.email.value === auth?.pouzivatel.email}
                        variant="contained"
                        sx={{ width: "14rem" }}
                    >
                        {pending ? "Aktualizuje sa..." : "Aktualizovať údaje"}
                    </Button>
                    <Button
                        type="submit"
                        disabled={pending}
                        variant="outlined"
                        sx={{ width: "14rem" }}
                    >
                        Zmeniť heslo
                    </Button>
                </Stack>
                {updated && <p>Údaje boli úspešne aktualizované</p>}
            </Stack>
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
            priezvisko: formData.get("priezvisko") as string
        });

        console.log("validacia na strane klienta")

        if (!parsedupdateUser.success) {
            alert("Nepodarilo sa aktualizovať údaje");
            return;
        } else {
            await updateUser(21, formData.get("firstName") as string, formData.get("priezvisko") as string);
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
                    name="priezvisko"
                    type="text"
                    required
                />
                <Button type="submit" disabled={isUpdating} variant="contained">{isUpdating ? "Aktualizuje sa..." : "Aktualizovať"}</Button>
            </Box>
*/