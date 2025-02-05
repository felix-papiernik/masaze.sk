"use client";

import { deleteSession } from "@/lib/actions";
import { Button } from "@mui/material";
import { redirect, useRouter } from "next/navigation";

export function SignOutButton() {

    const router = useRouter();

    const signOutAuth = async () => {

        await deleteSession(false);
        router.refresh();
        redirect("/prihlasenie");
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