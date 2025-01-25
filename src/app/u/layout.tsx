import { SignOutButton } from "@/components/SignOutButton";
import { Stack, Typography } from "@mui/material";


export default async function Layout({ children }: { children: React.ReactNode }) {

    //let entityData = await getEntityDataFromServerCookies();

    return (
        <Stack spacing={2} sx={{ background: "lightGrey", padding: 2 }}>
            <Typography variant="h2" component={"h1"}>Správa systému</Typography>
            {children}
            <div>
                <SignOutButton />
            </div>
        </Stack>
    );
}