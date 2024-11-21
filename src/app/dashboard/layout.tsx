import Link from "next/link";
import { signOut } from "../../../auth";
import { getSession } from 'next-auth/react';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function Layout({ children }: { children: React.ReactNode }) {

    // const session = await getSession();

    // const sUser = session?.user;

    // if (!sUser) {
    //     return <div>Unauthorized</div>
    // }
    
    // const user = await fetch(`/api/get-current-user?email=${sUser.email}`).then(res => res.json());

    return (
        <div style={{ background: "green", padding: 16 }}>
            <h1>Layout</h1>
            <ul style={{ display: "flex", gap: "20px" }}>
                <li>
                    <Link href="/dashboard/">Nástenka</Link>
                </li>
                <li>
                    <Link href="/dashboard/roles/">Používatelia</Link>
                </li>
                <li>
                    <Link href="/dashboard/masaze/">Masáže</Link>
                </li>
            </ul>
            {
            // false && <button onClick={async () => {
            //     "use server";
            //     await signOut();
            // }}>Odlásiť sa</button>
            }
            {children}
        </div>
    );
}
