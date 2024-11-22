"use client";

// src/app/dashboard/layout.tsx
import Link from "next/link";
import { useSession } from "next-auth/react";

const RBAC_MENU = {
    SUPERADMIN: [
        { label: "Nástenka", href: "/dashboard/" },
        { label: "Používateľské role", href: "/dashboard/roles/" },
        { label: "Masáže", href: "/dashboard/masaze/" },
        { label: "Môj účet", href: "/dashboard/my-account/" },
    ],
    OWNER: [
        { label: "Nástenka", href: "/dashboard/" },
        { label: "Môj účet", href: "/dashboard/my-account/" },
    ],
    MASSEUR: [
        { label: "Nástenka", href: "/dashboard/" },
        { label: "Masáže", href: "/dashboard/masaze/" },
    ],
    CLIENT: [
        { label: "Nástenka", href: "/dashboard/" },
        { label: "Môj účet", href: "/dashboard/my-account/" },
    ],
};

export default async function Layout({ children }: { children: React.ReactNode }) {
    const {data: session} = useSession();
    // const token = await getToken({ secret: process.env.SECRET });

    // // Ensure token exists
    // if (!token) {
    //     throw new Error("Unauthorized"); // Optionally redirect if needed
    // }

    //const userRole = token.role as keyof typeof RBAC_MENU || "CLIENT";
    const userRole = session?.user?.role as keyof typeof RBAC_MENU || "CLIENT";
    const menuItems = RBAC_MENU[userRole] || [];

    return (
        <div style={{ background: "green", padding: 16 }}>
            <h1>Layout</h1>
            <ul style={{ display: "flex", gap: "20px" }}>
                {menuItems.map((item) => (
                    <li key={item.href}>
                        <Link href={item.href}>{item.label}</Link>
                    </li>
                ))}
            </ul>
            {children}
            <button
                onClick={async () => {
                    //"use server";
                    console.log("Sign-out triggered"); // Add signOut logic here
                }}
            >
                Odhlásiť sa
            </button>
        </div>
    );
}
