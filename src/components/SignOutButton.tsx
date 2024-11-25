// src/app/dashboard/SignOutButton.tsx
"use client";

// import { signOut } from "../../auth";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
    return (
        <button
            onClick={async () => {
                console.log("Sign-out triggered");
                await signOut();
            }}
        >
            Odhlásiť sa
        </button>
    );
}
