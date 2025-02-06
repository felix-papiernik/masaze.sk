

import React from "react";
import { verifySession } from "@/lib/actions";
import MyAccountForm from "./MyAccountForm";

export default async function Page() {

    const session = await verifySession();
    const pouzivatel = session?.pouzivatel;

    return (
        pouzivatel ? <MyAccountForm pouzivatel={pouzivatel} /> : null
    )
}