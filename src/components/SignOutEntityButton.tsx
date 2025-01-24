"use client";

import { useUser } from "@/app/context/UserContext";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

export function SignOutEntityButton() {

    const { setEntity } = useUser();
    const router = useRouter();
    const signOut = async () => {
        const response = await fetch('/api/signout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            console.log("user logged out");
            setEntity(null);
            router.push("/prihlasenie");
        } else {
            console.log("error logging out");
        }
    }

    return (
        <Button
            onClick={signOut}
            type="button"
            variant="contained"
        >Odhlásiť sa KLIENT kompo</Button>
    );
}