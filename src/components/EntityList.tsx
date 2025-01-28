"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Autocomplete, TextField, Stack, Button, Grid2, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import EntityCard from "./EntityCard";
import KnihaCard from "./KnihaCard";
import { EntityGroupedData } from "@/lib/types";

type FilterElement = "TextField" | "Autocomplete" | "Slider"

interface Filter {
    key: string,
    label: string,
    type: FilterElement,
    options?: string[] // Pre Autocomplete
}

interface EntityListProps {
    data: EntityGroupedData[]
    filters: Filter[]
}

export default function EntityList({ data, filters }: EntityListProps) {

    const router = useRouter();
    const searchParams = useSearchParams();
    const [filterValues, setFilterValues] = useState<Record<string, string>>({});

    useEffect(() => {
        const params: Record<string, string> = {};
        filters.forEach((filter) => {
            const value = searchParams?.get(filter.key);
            if (value) params[filter.key] = value;
        });
        setFilterValues(params);
    }, [filters, searchParams]);

    const handleFilterChange = (key: string, value: string) => {
        const newFilters = { ...filterValues, [key]: value };
        setFilterValues(newFilters);

        const query = new URLSearchParams(newFilters).toString();
        router.push(`?${query}`);
    };

    const filteredData = data.filter((item) => {
        return filters.every((filter) => {
            const value = filterValues[filter.key];
            if (!value) return true; // Ak filter nie je nastavený, preskoč ho
            if (filter.type === "TextField") {
                return String(item[filter.key] || "").toLowerCase().includes(value.toLowerCase());
            }
            //TODO: Implement Autocomplete and Slider filters
            return true;
        });
    });

    return (
        <>
            {data.length == 0 ?
                <p>Mrzí nás to, no momentálne v systéme nemáme TODO :(</p>
                :
                <Grid2 container columns={{ xs: 1, md: 2, lg: 4 }} spacing={2} padding={2}>
                    {filteredData.map((item, index) => (
                        <Grid2 key={item.data.id} size={1}>
                            <EntityCard
                                entity={item}
                                entityDetailUrl="/u/admin/knihy"
                                editable={index % 2 === 0 ? { editUrl: "/u/admin/knihy/" + item.data.id, handleDelete: async () => { } } : undefined}
                            />
                        </Grid2>
                    ))}
                </Grid2>
            }
        </>
    )
}
