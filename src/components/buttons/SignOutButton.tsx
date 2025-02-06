"use client";

import { deleteSession } from "@/lib/actions";
import { ExitToApp, PowerOff, PowerSettingsNew } from "@mui/icons-material";
import { Button } from "@mui/material";
import { redirect, useRouter } from "next/navigation";
export interface SignOutButtonProps {
    variant?: "text" | "outlined" | "contained";
    color?: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning";
    includeIcon?: boolean;
}
export function SignOutButton(props: SignOutButtonProps) {

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
            variant={props.variant ?? "contained"}
            color={props.color ?? "primary"}
            startIcon={props.includeIcon ? <PowerSettingsNew /> : null}
        >Odhlásiť sa</Button>
    );
}