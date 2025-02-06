import { SignOutButton } from "@/components/buttons/SignOutButton";
import { verifySession } from "@/lib/actions";
import { Abc, Book, CollectionsBookmark, Edit, Group, Person } from "@mui/icons-material";
import { Box, List, ListItemButton, ListItemIcon, ListItemText, Stack, Typography } from "@mui/material";
import Link from "next/link";
import MenuItemLink from "./MenuItemLink";

export default async function Layout({ children }: { children: React.ReactNode }) {

    const session = await verifySession();
    const jeAdmin = session ? session.pouzivatel.je_admin : false;

    const adminLinks = [
        { href: "/u/admin/knihy", label: "Knihy", icon: <CollectionsBookmark /> },
        { href: "/u/admin/autori", label: "Autori", icon: <Group />  },
        { href: "/u/admin/zanre", label: "Žánre", icon: <Abc /> },
    ]



    return (
        <Stack spacing={5} direction={"row"} sx={{ background: "lightGrey", padding: 2, flexGrow: 1, minHeight: "100%" }}>
            <Stack direction={"column"} spacing={2} sx={{ margin: "auto", minHeight: "100%", backgroundColor: "white", minWidth: "250px" }}>
                <List>
                    {jeAdmin && <>
                        <ListItemButton component={Link} href="/u/admin/knihy">
                            <ListItemIcon>
                                <Edit />
                            </ListItemIcon>
                            <ListItemText primary="Správa systému" />
                        </ListItemButton>
                        <Box> {/* Indent submenu */}
                            <List sx={{ py: 0 }}>
                                {adminLinks.map((link) => (
                                    <ListItemButton key={link.href} component={Link} href={link.href} sx={{ pl: 4 }}>
                                        <ListItemIcon>
                                            {link.icon}
                                        </ListItemIcon>
                                        <ListItemText primary={link.label} />
                                    </ListItemButton>
                                ))}
                            </List>
                        </Box>
                    </>
                    }
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