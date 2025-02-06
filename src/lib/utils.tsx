

import { Abc, CollectionsBookmark, Group } from "@mui/icons-material";


export const redirectUrlAfterLogin = (isAdmin: boolean): string => {
    return isAdmin ? "/u/admin/knihy" : "/u/moje-knihy";
}

export const getAdminLinks = () => [
    { href: "/u/admin/knihy", label: "Knihy", icon: <CollectionsBookmark /> },
    { href: "/u/admin/autori", label: "Autori", icon: <Group /> },
    { href: "/u/admin/zanre", label: "Žánre", icon: <Abc /> },
]