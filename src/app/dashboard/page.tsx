"use client";

import { getUserFromServerCookies } from "@/lib/utils";
import { useUser } from "../context/UserContext";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { updateFirstName } from "@/lib/actions";

export default async function Dashboard() {

    const user = await getUserFromServerCookies();



    return (
        <div style={{ background: "grey" }}>
            <h1>Dashboard</h1>
            <h2>Aj ked je toto serverovy kompo</h2>
            <div>tu je info o pouzivatelovi: {user?.email} a meno {user?.firstName}</div>
            <form action={updateFirstName}>
                <input type="hidden" value={user?.id} name="userId" />
                <button type="submit" >Update firstname to "FFF"</button>
            </form>

        </div>
    )
}