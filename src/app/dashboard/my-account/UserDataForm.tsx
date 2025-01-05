"use client";

import { delay, updateUser } from '@/lib/actions';
import { USER } from '@/lib/prisma';
import { Box, Button, Stack, TextField } from '@mui/material';
import React, { useActionState, useState } from 'react'
import { auth } from '../../../../auth';


interface props {
    //user: Omit<USER, "password" >;
    user: Pick<USER, "firstName" | "lastName" | "id" >;
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
    const [userData, setUserData] = useState({
        firstName: {
            value: props.user.firstName,
            error: ""
        },
        lastName: {
            value: props.user.lastName,
            error: ""
        }
    }); 

    const handleUserUpdate = async () => {
        event?.preventDefault();
        setPending(true);
        
        await delay(2000);
        await updateUser(props.user.id, userData.firstName.value, userData.lastName.value);

        setPending(false);
    }

    const handleDeleteUser = async (event: React.FormEvent<HTMLFormElement>) =>{
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
            />
            <Button
                type="submit"
                disabled={pending}
                variant="contained">
                {pending ? "Aktualizuje sa..." : "Aktualizovať údaje"}
            </Button>
        </Stack>
    )
}
