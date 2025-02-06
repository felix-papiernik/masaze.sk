import { SignOutButton } from "@/components/buttons/SignOutButton";
import { verifySession } from "@/lib/actions";
import { Book, Edit, Person } from "@mui/icons-material";
import { Box, Divider, List, Stack } from "@mui/material";
import MenuListItemButton from "../../components/buttons/MenuListItemButton";
import { getAdminLinks } from "@/lib/utils";

export default async function Layout({ children }: { children: React.ReactNode }) {

    const session = await verifySession();
    const jeAdmin = session ? session.pouzivatel.je_admin : false;

    return (
        <Stack direction={"row"} sx={{ flexGrow: 1, minHeight: "100%", gap: { xs: 0, lg: 5 } }}>
            <Stack direction={"column"} spacing={2} sx={{ display: { xs: "none", lg: "flex" }, margin: "auto", minHeight: "100%", backgroundColor: "background.paper", minWidth: "250px", borderRadius: 2 }}>
                <List>
                    {jeAdmin && <>
                        <MenuListItemButton url={"/u/admin"} text={"Správa systému"} icon={<Edit />} isActivePredicate="exact" />
                        <List sx={{ py: 0 }}>
                            {getAdminLinks().map((link) => (
                                <MenuListItemButton
                                    key={link.href}
                                    url={link.href}
                                    text={link.label}
                                    icon={link.icon}
                                    paddingLeft={4}
                                    isActivePredicate={"startsWith"}
                                />
                            ))}
                        </List>
                    </>
                    }
                    <Divider />
                    <MenuListItemButton url={"/u/moje-knihy"} text={"Moje knihy"} icon={<Book />} />
                    <MenuListItemButton url={"/u/moj-ucet"} text={"Môj účet"} icon={<Person />} />
                </List>

                <Box sx={{ flexGrow: 1, marginBottom: "auto", display: "flex", alignItems: "flex-end", padding: 2 }}>
                    <SignOutButton includeIcon variant="outlined" />
                </Box>
            </Stack>
            <Box sx={{ display: "block", width: "100%", flexGrow: 1, backgroundColor: { lg: "background.paper" }, borderRadius: { lg: 2 }, p: { lg: 3 } }}>
                {children}
            </Box>
        </Stack>
    );
}