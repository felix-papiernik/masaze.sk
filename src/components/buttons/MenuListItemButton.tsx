"use client";

import { Book } from '@mui/icons-material';
import { ListItemButton, ListItemIcon, ListItemText, useTheme } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'

export interface MenuItemLinkProps {
    url: string;
    text: string;
    paddingLeft?: number;
    icon: React.ReactNode;
    isActivePredicate?: "startsWith" | "exact";
}

export default function MenuListItemButton(props : MenuItemLinkProps) {

    const pathname = usePathname();
    const theme = useTheme();
    // const isActive = pathname?.startsWith(props.url);
    const isActive = props.isActivePredicate === "startsWith" ? pathname?.startsWith(props.url) : pathname === props.url;

    return (
        <ListItemButton component={Link} href={props.url} sx={{
            backgroundColor: isActive ? theme.palette.primary.light : null,
            color: isActive ? theme.palette.primary.contrastText : "inherit",
            "&:hover": {
                backgroundColor: theme.palette.primary.light,
                color: theme.palette.primary.contrastText
            },
            "&:hover .menu-icon": {
                color: theme.palette.primary.contrastText,
            },
            paddingLeft: props.paddingLeft || theme.spacing(2),
        }}>
            <ListItemIcon className="menu-icon" sx={{
                color: isActive ? theme.palette.primary.contrastText : "inherit",
                minWidth: theme.spacing(5),
            }}>
                {props.icon}
            </ListItemIcon>
            <ListItemText primary={props.text} />
        </ListItemButton>
    )
}
