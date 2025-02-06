import { Box, Typography } from '@mui/material'
import React from 'react'

export default function Footer() {
    return (
        <Box component="footer" sx={{ padding: 2, backgroundColor: "grey" }}>
            <Typography textAlign={"center"}>&copy; 2024 - 2025 citaj.sk</Typography>
        </Box>
    )
}
