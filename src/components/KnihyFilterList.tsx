"use client";

import { KnihaGroupedData } from '@/lib/types'
import React, { useEffect, useState } from 'react'
import FilterEntityLayout from './FilterEntityLayout';
import { useRouter, useSearchParams } from 'next/navigation';
import { Autocomplete, Slider, Stack, TextField } from '@mui/material';

interface KnihyFilterListProps {
    knihy: KnihaGroupedData[];
}

export default function KnihyFilterList({ knihy }: KnihyFilterListProps) {

    const router = useRouter();
    const searchParams = useSearchParams();

    const defaultFilters = {
        nazov: "",
        autor: "",
        zaner: "",
        pocet_stran_od: "0",
        pocet_stran_do: Math.max(...knihy.map(k => k.data.pocet_stran)).toString(),
    }
    const [currentFilterValues, setCurrentFilterValues] = useState({ ...defaultFilters });
    const [appliedFilters, setAppliedFilters] = useState({ ...defaultFilters });

    useEffect(() => {
        const params: typeof defaultFilters = { ...defaultFilters };

        if (searchParams) {
            for (const [key, value] of searchParams.entries()) {
                if (key in defaultFilters) {
                    params[key as keyof typeof defaultFilters] = value;
                }
            }
        }
        setCurrentFilterValues(params);
        setAppliedFilters(params);
    }, [searchParams]);


    // Funkcia na zmenu lokálneho stavu filtra
    const handleFilterChange = (key: string, value: string) => {
        setCurrentFilterValues((prev) => ({ ...prev, [key]: value }));
    };

    // Aplikovanie filtrov a synchronizácia s URL
    const applyFilters = () => {
        setAppliedFilters(currentFilterValues);
        let notEmptyFilters = { ...currentFilterValues };
        for (const key in notEmptyFilters) {
            if (notEmptyFilters[key as keyof typeof defaultFilters] === "") {
                delete notEmptyFilters[key as keyof typeof defaultFilters];
            }
        }
        const query = new URLSearchParams(notEmptyFilters).toString();
        router.push(`?${query}`);
    };

    const resetFilters = () => {
        setAppliedFilters({...defaultFilters})
        router.push("");
    }

    // Lokálna filtrácia dát
    const filteredData = knihy.filter((k) => {
        return Object.keys(defaultFilters).every((key) => {
            const value = appliedFilters[key as keyof typeof defaultFilters];
            if (!value) return true; // Ak filter nie je nastavený, preskoč ho
            if (key === "nazov" || key === "autor") {
                return String(k.data[key] || "").toLowerCase().includes(value.toLowerCase());
            } else if (key === "pocet_stran_od") {
                return k.data.pocet_stran >= parseInt(value);
            } else if (key === "pocet_stran_do") {
                return k.data.pocet_stran <= parseInt(value);
            }
            // TODO: Implement Autocomplete and Slider filters
            return true;
            //return String(k.data[key] || "").toLowerCase().includes(value.toLowerCase());
        });
    });


    return (
        <FilterEntityLayout
            filters={<>
                <TextField
                    fullWidth
                    label="Názov"
                    value={currentFilterValues.nazov}
                    onChange={(e) => handleFilterChange("nazov", e.target.value)}
                    sx={{ mb: 2 }}
                />
                <Autocomplete
                    options={[...new Map(knihy.map((k) => [k.data.autor.id, k.data.autor])).values()]}
                    getOptionLabel={(option) => option.meno + " " + option.priezvisko}
                    getOptionKey={(option) => option.id}
                    sx={{ mb: 2 }}
                    renderInput={(params) => <TextField
                        {...params}
                        label="Autor"
                        value={currentFilterValues.autor}
                        onChange={(e) => handleFilterChange("autor", e.target.value)}
                    />}
                />
                <Autocomplete
                    options={[...new Map(knihy.map((k) => [k.data.zaner.id, k.data.zaner])).values()]}
                    getOptionLabel={(option) => option.nazov}
                    getOptionKey={(option) => option.id}
                    sx={{ mb: 2 }}
                    renderInput={(params) => <TextField
                        {...params}
                        label="Žáner"
                        value={currentFilterValues.zaner}
                        onChange={(e) => handleFilterChange("zaner", e.target.value)}
                    />}
                />
                <Stack direction="row" spacing={2} alignItems="center">
                    <TextField
                        label="Počet strán od"
                        type="number"
                        value={parseInt(currentFilterValues.pocet_stran_od)}
                        onChange={(e) => handleFilterChange("pocet_stran_od", e.target.value)}
                    />
                    <TextField
                        label="Počet strán do"
                        type="number"
                        value={parseInt(currentFilterValues.pocet_stran_do)}
                        onChange={(e) => handleFilterChange("pocet_stran_do", e.target.value)}
                    />
                </Stack>
            </>}
            applyFilters={applyFilters}
            resetFilters={resetFilters}
            filteredData={filteredData}
            pagination={<div>Pagination</div>}
        />
    );
}
