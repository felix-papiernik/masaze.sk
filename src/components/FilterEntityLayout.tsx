import { Grid2, Typography, Button, IconButton, Stack } from '@mui/material';
import React from 'react'
import EntityList from './EntityList';
import { EntityGroupedData } from '@/lib/types';
import { Clear, Delete } from '@mui/icons-material';

interface FilterProps {
    filters: React.ReactNode;
    applyFilters: () => void;
    resetFilters: () => void;
    filteredData: EntityGroupedData[]
    pagination: React.ReactNode;
}

export default function FilterEntityLayout(props: FilterProps) {
    return (
        <Grid2 container spacing={8}>
            <Grid2 size={2}>
                <Typography variant="h5" mb={2}>Filtrovať</Typography>
                {props.filters}
                <Stack direction={"row"} mt={2}>
                    <Button variant="contained" onClick={props.applyFilters}>
                        Filtrovať
                    </Button>
                    <IconButton onClick={props.resetFilters} >
                        <Clear />
                    </IconButton>
                </Stack>
            </Grid2>
            <Grid2 size={10}>
                <EntityList data={props.filteredData} />
                {props.pagination}
            </Grid2>
        </Grid2>
    )
}
