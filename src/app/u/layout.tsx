import { SignOutButton } from "@/components/buttons/SignOutButton";
import { verifySession } from "@/lib/actions";
import { Abc, Book, CollectionsBookmark, Edit, Group, Person } from "@mui/icons-material";
import { Box, Divider, List, ListItemButton, ListItemIcon, ListItemText, Stack, Typography } from "@mui/material";
import Link from "next/link";
import MenuItemLink from "./MenuItemLink";

export default async function Layout({ children }: { children: React.ReactNode }) {

    const session = await verifySession();
    const jeAdmin = session ? session.pouzivatel.je_admin : false;

    const adminLinks = [
        { href: "/u/admin/knihy", label: "Knihy", icon: <CollectionsBookmark /> },
        { href: "/u/admin/autori", label: "Autori", icon: <Group /> },
        { href: "/u/admin/zanre", label: "Žánre", icon: <Abc /> },
    ]



    return (
        <Stack spacing={5} direction={"row"} sx={{ background: "lightGrey", padding: 2, flexGrow: 1, minHeight: "100%" }}>
            <Stack direction={"column"} spacing={2} sx={{ margin: "auto", minHeight: "100%", backgroundColor: "white", minWidth: "250px" }}>
                <List>
                    {jeAdmin && <>
                        <MenuItemLink url={"/u/admin"} text={"Správa systému"} icon={<Edit />} isActivePredicate="exact" />
                        <List sx={{ py: 0 }}>
                            {adminLinks.map((link) => (
                                <MenuItemLink
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
                    <MenuItemLink url={"/u/moje-knihy"} text={"Moje knihy"} icon={<Book />} />
                    <MenuItemLink url={"/u/moj-ucet"} text={"Môj účet"} icon={<Person />} />
                </List>
                <Box sx={{ flexGrow: 1, marginBottom: "auto" }}>
                    <SignOutButton />
                </Box>
            </Stack>
            <Box sx={{ display: "block", width: "100%", flexGrow: 1 }}>
                {children}
            </Box>
        </Stack>
    );
}