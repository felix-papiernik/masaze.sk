"use client";

import { useAuth } from "@/context/AuthContext";
import { deleteSession } from "@/lib/actions";
import { Button } from "@mui/material";

export function SignOutButton() {

    const { setAuth } = useAuth();

    const signOutAuth = async () => {
        await deleteSession();
        setAuth(null);
    }

    return (
        <Button
            onClick={signOutAuth}
            //onClick={signOut}
            type="button"
            variant="contained"
        >Odhlásiť sa</Button>
    );
}