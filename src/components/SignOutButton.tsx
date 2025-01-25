"use client";

import { useAuth } from "@/context/AuthContext";
import { useEntity } from "@/context/EntityContext";
import { deleteSession } from "@/lib/actions";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

export function SignOutButton() {

    const { setAuth } = useAuth();

    const signOutAuth = async () => {
        deleteSession();
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