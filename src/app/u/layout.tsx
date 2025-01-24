import { SignOutButton } from "@/components/SignOutButton";


export default async function Layout({ children }: { children: React.ReactNode }) {

    //let entityData = await getEntityDataFromServerCookies();

    return (
        <div style={{ background: "lightGrey", padding: 16 }}>
            <h5>Protected path /u/*</h5>
            {children}
            <SignOutButton />
        </div>
    );
}