import { getEntityDataFromServerCookies, getUser, verifySession } from "@/lib/actions";
import prisma from "@/lib/prisma";
import { klient } from "@prisma/client";
import { revalidatePath } from "next/cache";

export default async function Dashboard() {

    const auth = await verifySession();
    const user = await getUser({ id: auth!.id, role: auth!.entity });

    const updateMeno = async (e: any) => {
        "use server";
        const formData = new FormData(e.target);
        const updatedUser = await prisma.klient.update({
            where: {
                id: auth?.id
            },
            data: {
                meno: "FFF"
            }
        })
        if (updatedUser) {
            revalidatePath("/dashboard");
        }
    }

    return (
        <div style={{ background: "grey" }}>
            <h1>{auth?.klient ? "Klientská" : auth?.maser ? "Masérska" : "Podniková"} nástenka</h1>
        </div>
    )
}

{/* <form action={updateMeno}>
                    <div>Tvoje meno je {klient?.meno}</div>
                    <button type="submit" >Update meno to "FFF"</button>
                </form> */}