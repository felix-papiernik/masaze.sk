import { Stack } from '@mui/material'
import Link from 'next/link'
import React from 'react'
import NavMenu from './NavMenu'
import { User } from '@prisma/client'

export default function Header({ user }: { user: User | null }) {
    return (
        <Stack component="header" sx={{ justifyContent: "space-between", flexDirection: "row", padding: 2, backgroundColor: "grey" }}>
            <Link href={"/"}>masaze.sk</Link>
            <Stack component="nav" direction="row" gap={4} alignItems="center">
                <NavMenu user={user} />
            </Stack>
        </Stack>
    )
}
