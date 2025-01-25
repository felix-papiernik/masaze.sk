import { verifySession } from "@/lib/actions";

export default async function Dashboard() {

    const auth = await verifySession();

    return (
        <div style={{ background: "grey" }}>
            <h1>Nástenka <strong>{auth?.pouzivatel.je_admin ? "admin" : "čitateľa"}</strong> {auth?.pouzivatel.meno}</h1>
        </div>
    )
}