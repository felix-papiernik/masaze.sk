import Link from "next/link";
import { auth, signOut } from "../../../auth";
import { Button, Stack } from "@mui/material";

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
        { label: "Môj účet", href: "/dashboard/my-account/" },
    ],
    CLIENT: [
        { label: "Nástenka", href: "/dashboard/" },
        { label: "Môj účet", href: "/dashboard/my-account/" },
    ],
};

export default async function Layout({ children }: { children: React.ReactNode }) {
    const session = await auth();
    if (!session) {
        return Response.redirect("/prihlasenie");
    }

    const { user } = session;
    //console.log("user: ", user);

    const userRole = user.role;
    const menuItems = RBAC_MENU[userRole] || [];

    return (
        <div style={{ background: "lightGrey", padding: 16 }}>
            <h5>Vitajte, {user?.email}, tvoja používateľská roľa je: {userRole}</h5>

            <Stack direction="row" spacing={2}>
                {menuItems.map((item, index) => <Link key={index} href={item.href}>{item.label}</Link>)}
            </Stack>
            {children}
            <form action={async () => {
                'use server';
                await signOut();
            }}>
                <button>Odhlásiť sa</button>
            </form>
        </div>
    );
}