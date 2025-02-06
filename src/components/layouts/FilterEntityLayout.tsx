import { Grid2, Typography, Button, IconButton, Stack } from '@mui/material';
import React from 'react'
import EntityList from '../EntityList';
import { EntityGroupedData } from '@/lib/types';
import { Clear } from '@mui/icons-material';

interface FilterProps {
    filters: React.ReactNode;
    applyFilters: () => void;
    resetFilters: () => void;
    filteredData: EntityGroupedData[]
    pagination: React.ReactNode;
    direction?: "row" | "column";
}

export default function FilterEntityLayout(props: FilterProps) {

    const directionRow = props.direction === "row";

    return (
        <Grid2 container spacing={{ xs: 4, lg: directionRow ? 8 : 2 }}>
            <Grid2 size={{ xs: 12, lg: directionRow ? 3 : 12, xl: directionRow ? 2 : 12 }} sx={{ display: "flex", flexDirection: directionRow ? "column" : "row" }}>
                <Stack direction={directionRow ? "column" : "row"} spacing={2} flexWrap={"wrap"}>
                    {directionRow && <Typography variant="h5" mb={2}>Filtrovať</Typography>}
                    {props.filters}
                    <Stack direction={"row"} mt={2}>
                        <Button variant="contained" onClick={props.applyFilters}>
                            Filtrovať
                        </Button>
                        <IconButton onClick={props.resetFilters} >
                            <Clear />
                        </IconButton>
                    </Stack>
                </Stack>
            </Grid2>
            <Grid2 size={{ xs: 12, lg: directionRow ? 9 : 12, xl: directionRow ? 10 : 12 }}>
                <EntityList data={props.filteredData} />
                {props.pagination}
            </Grid2>
        </Grid2>
    )
}
