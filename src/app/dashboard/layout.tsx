import Link from "next/link";
import { Button, Stack } from "@mui/material";
import SignOutButton from "@/components/SignOutButton";
import { getUserFromServerCookies } from "@/lib/utils";

const RBAC_MENU = {
    ADMIN: [
        { label: "Nástenka", href: "/dashboard/" },
        { label: "Používateľské role", href: "/dashboard/roles/" },
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

    let user = await getUserFromServerCookies();

    return (
        <div style={{ background: "lightGrey", padding: 16 }}>
            <h5>Vitajte na nástenke</h5>
            <div>Tvoja rola je: {user?.role}</div>

            {children}
        </div>
    );
}

/*
<div style={{ background: "lightGrey", padding: 16 }}>
            <h5>Vitajte, {user?.email}, tvoja používateľská roľa je: {userRole}</h5>

            <Stack direction="row" spacing={2}>
                {menuItems.map((item : any, index : number) => <Link key={index} href={item.href}>{item.label}</Link>)}
            </Stack>
            {children}
            <SignOutButton />
        </div>
*/