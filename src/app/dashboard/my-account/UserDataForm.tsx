"use client";

import { delay, updateUser } from '@/lib/actions';
import { USER } from '@/lib/prisma';
import { Box, Button, Stack, TextField } from '@mui/material';
import React, { useActionState, useState } from 'react'
import { auth } from '../../../../auth';
import { validateCreateUserData, validateUpdateUserData } from '@/lib/zodValidations';


interface props {
    user: Omit<USER, "password" | "role">;
    //user: Pick<USER, "firstName" | "lastName" | "id" >;
    //updateUser: (user: Pick<USER, "firstName" | "lastName" >) => void;
}

export default function UserDataForm(props: props) {

    // const session = await auth();
    // if (!session) {
    //     return Response.redirect("/prihlasenie");
    // }
    // const userId = Number(session?.user?.id);
    // console.log("user id je: " + userId);

    const [pending, setPending] = useState(false);
    const [updated, setUpdated] = useState(false);
    const [userData, setUserData] = useState({
        firstName: {
            value: props.user.firstName,
            error: ""
        },
        lastName: {
            value: props.user.lastName,
            error: ""
        },
        email: {
            value: props.user.email,
            error: ""
        },
        phone: {
            value: props.user.phone,
            error: ""
        }
    });

    console.log(userData);

    const handleUserUpdate = async () => {
        event?.preventDefault();
        setPending(true);
        setUpdated(false);

        await delay(2000);
        const zValidatedData = validateUpdateUserData({
            firstName: userData.firstName.value,
            lastName: userData.lastName.value,
            email: userData.email.value,
            phone: userData.phone.value,
        });
        if (zValidatedData.error) {
            setUserData({
                ...userData,
                firstName: { value: userData.firstName.value, error: zValidatedData.error.errors.find(e => e.path.includes('firstName'))?.message || '' },
                lastName: { value: userData.lastName.value, error: zValidatedData.error.errors.find(e => e.path.includes('lastName'))?.message || '' },
                email: { value: userData.email.value, error: zValidatedData.error.errors.find(e => e.path.includes('email'))?.message || '' },
                phone: { value: userData.phone.value, error: zValidatedData.error.errors.find(e => e.path.includes('phone'))?.message || '' },
            });
            setPending(false);
            return;
        }
        await updateUser(props.user.id, {
            firstName: userData.firstName.value,
            lastName: userData.lastName.value,
            email: userData.email.value,
            phone: userData.phone.value,
        });
        setUpdated(true);
        setPending(false);
    }

    const handleDeleteUser = async (event: React.FormEvent<HTMLFormElement>) => {
        //setIsDeleting(true);
        event.preventDefault();

        // const response = await deleteUser(Number(session?.user?.id));
        // // const restext = await deleteUser(35);
        // setIsDeleting(false);

        // alert(response.message);
        // if (response.success) {
        //     await signOut();
        // }
    }

    return (
        <Stack component="form" onSubmit={handleUserUpdate} mb={4} direction={"column"} gap={2}>
            <TextField
                variant='outlined'
                label='Meno'
                value={userData.firstName.value}
                onChange={(e) => setUserData({ ...userData, firstName: { value: e.target.value, error: userData.firstName.error } })}
                required
                helperText={userData.firstName.error}
                error={!!userData.firstName.error}
            />
            <TextField
                variant='outlined'
                label='Priezvisko'
                value={userData.lastName.value}
                onChange={(e) => setUserData({ ...userData, lastName: { value: e.target.value, error: userData.lastName.error } })}
                required
                helperText={userData.lastName.error}
                error={!!userData.lastName.error}
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
            <TextField
                variant='outlined'
                label='Telefón'
                value={userData.phone.value}
                onChange={(e) => setUserData({ ...userData, phone: { value: e.target.value, error: userData.phone.error } })}
                required
                helperText={userData.phone.error}
                error={!!userData.phone.error}
            />

            <Button
                type="submit"
                disabled={pending}
                variant="contained"
                sx={{ width: "14rem" }}
                >
                {pending ? "Aktualizuje sa..." : "Aktualizovať údaje"}
            </Button>
        </Stack>
    )
}
