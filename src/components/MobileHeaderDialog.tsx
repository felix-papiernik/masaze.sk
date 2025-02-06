"use client";

import { Dialog, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import React, { useState } from 'react'

export default function MobileHeaderDialog() {

    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            <IconButton onClick={() => setMenuOpen(true)}>
                <MenuIcon />
            </IconButton>
            <Dialog open={menuOpen} onClose={() => setMenuOpen(false)} fullScreen>
            </Dialog>
        </>
    )
}
