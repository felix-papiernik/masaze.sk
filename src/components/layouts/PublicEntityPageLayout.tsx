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
        <Box px={{ xs: 0, lg: 4 }} width={"100%"}>
            <Typography variant="h1" my={{ xs: 2, lg: 6 }}>{props.title}</Typography>
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
