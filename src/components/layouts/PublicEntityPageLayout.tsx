import { Box, Typography } from '@mui/material'
import React from 'react'

interface PublicEntityPageLayoutProps {
    title: string
    noEntitiesMessage: string
    entityLength: number
    filterList: React.ReactNode
}

export default function PublicEntityPageLayout(props: PublicEntityPageLayoutProps) {
    return (
        <Box px={4}>
            <Typography variant="h1" mb={6}>{props.title}</Typography>
            {props.entityLength == 0 ?
                <Typography>{props.noEntitiesMessage}</Typography>
                :
                <>
                    {props.filterList}
                </>
            }
        </Box>
    )
}
