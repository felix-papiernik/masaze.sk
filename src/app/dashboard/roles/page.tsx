import UsersTable from "@/components/UsersTable";
import prisma from "@/lib/prisma"


export default async function Page() {

    const users = await prisma.user.findMany();

    return (
        <div>
            <h1>Používateľské role</h1>
            <UsersTable users={users} />
        </div>
    )
}