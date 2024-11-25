import Link from "next/link";
import { auth, signOut } from "../../../auth";

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
    const session = await auth();
    if (!session) {
        return Response.redirect("/prihlasenie");
    }

    const { user } = session;
    //console.log("user: ", user);

    const userRole = user.role;
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
            <form action={async () => {
                'use server';
                await signOut();
            }}>
                <button>Odhlásiť sa</button>
            </form>
        </div>
    );
}