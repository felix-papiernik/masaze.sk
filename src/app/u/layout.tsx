import { Stack } from "@mui/material";

export default async function Layout({ children }: { children: React.ReactNode }) {

    return (
        <Stack spacing={2} sx={{ background: "lightGrey", padding: 2 }}>
            {children}
        </Stack>
    );
}