import { getEntityDataFromServerCookies } from "@/lib/actions";
import prisma from "@/lib/prisma";
import { klient } from "@prisma/client";
import { revalidatePath } from "next/cache";

export default async function Dashboard() {

    const entity = await getEntityDataFromServerCookies();

    let data;
    let klient : klient | null = null;

    if (entity?.klient) {
        klient = await prisma.klient.findUnique({
            where: {
                id: entity.id
            }
        })

    }

    const updateMeno = async (e: any) => {
        "use server";
        const formData = new FormData(e.target);
        const updatedUser = await prisma.klient.update({
            where: {
                id: klient?.id
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
            <h1>Dashboard</h1>
            <h2>Aj ked je toto serverovy kompo</h2>
            <div>tu je info o prihlasenom pouzivatelovi, rola je: {entity?.entity}</div>
            {entity?.entity == "klient" &&
                <form action={updateMeno}>
                    <div>Tvoje meno je {klient?.meno}</div>
                    <button type="submit" >Update meno to "FFF"</button>
                </form>
            }
        </div>
    )
}