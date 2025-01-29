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

    type AutocompleteData = {
        id: number | null,
        value: string
    }
    const defaultFilters = {
        nazov: "",
        autor: {
            id: null,
            value: "",
        } as AutocompleteData,
        zaner: {
            id: null,
            value: ""
        } as AutocompleteData,
    }
    const [currentFilterValues, setCurrentFilterValues] = useState({ ...defaultFilters });
    const [appliedFilters, setAppliedFilters] = useState({ ...defaultFilters });

    useEffect(() => {
        const params: typeof defaultFilters = { ...defaultFilters };

        if (searchParams) {
            for (const [key, value] of searchParams.entries()) {
                if (key === "nazov") {
                    params[key] = value;
                } else if (key === "autor") {
                    const autor = knihy.find((k) => k.data.autor.id === Number(value))?.data.autor;
                    if (autor) {
                        params[key] = {
                            id: autor.id,
                            value: autor.meno + " " + autor.priezvisko
                        }
                    }
                } else if (key === "zaner") {
                    const zaner = knihy.find((k) => k.data.zaner.id === Number(value))?.data.zaner;
                    if (zaner) {
                        params[key] = {
                            id: zaner.id,
                            value: zaner.nazov
                        }
                    }
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
        let filters = {} as { [key: string]: string };
        for (const key in currentFilterValues) {
            if (key === "nazov" && currentFilterValues[key] !== "") {
                filters[key] = currentFilterValues[key];
            } else if (key === "autor" && currentFilterValues[key].id !== null) {
                filters[key] = currentFilterValues[key].id!.toString();
            } else if (key === "zaner" && currentFilterValues[key].id !== null) {
                filters[key] = String(currentFilterValues[key].id);
            }
        }
        const query = new URLSearchParams(filters).toString();
        router.push(`?${query}`);
    };

    const resetFilters = () => {
        setAppliedFilters({ ...defaultFilters })
        router.replace(window.location.pathname)
    }

    // Lokálna filtrácia dát
    const filteredData = knihy.filter((k) => {
        return Object.keys(defaultFilters).every((key) => {
            const value = appliedFilters[key as keyof typeof defaultFilters];
            if (!value) return true; // Ak filter nie je nastavený, preskoč ho
            if (key === "nazov") {
                const filterValue = typeof value === 'string' ? value : value.value;
                return String(k.data[key] || "").toLowerCase().includes(filterValue.toLowerCase());
            } else if (key === "autor") {
                return k.data.autor.id === parseInt(value.toString());
            } else if (key === "zaner") {
                return k.data.zaner.id === parseInt(value.toString());
            }
            // TODO: Implement Autocomplete and Slider filters
            return true;
            //return String(k.data[key] || "").toLowerCase().includes(value.toLowerCase());
        });
    });

    const uniqueAutors = [...new Map(knihy.map((k) => [k.data.autor.id, k.data.autor])).values()];

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
                    value={currentFilterValues.autor.id ? {
                        id: currentFilterValues.autor.id,
                        value: currentFilterValues.autor.value
                    } : { id: null, value: ""
                    }}
                    options={[uniqueAutors.map((a) => ({ id: a.id, value: a.meno + " " + a.priezvisko }))]}
                    onChange={(event, newValue) => {
                        setCurrentFilterValues((prev) => ({
                            ...prev,
                            autor: {
                                id: newValue?.id || null,
                                value: newValue ? newValue.meno + " " + newValue.priezvisko : ""
                            }
                        }));
                    }}
                    getOptionLabel={(option) => option.meno + " " + option.priezvisko}
                    getOptionKey={(option) => option.id}
                    sx={{ mb: 2 }}
                    renderInput={(params) => <TextField
                        {...params}
                        label="Autor"
                    />}
                />
                <Autocomplete
                    options={[...new Map(knihy.map((k) => [k.data.zaner.id, k.data.zaner])).values()]}
                    onChange={(event, newValue) => {
                        setCurrentFilterValues((prev) => ({
                            ...prev,
                            zaner: {
                                id: newValue?.id || null,
                                value: newValue ? newValue.nazov : ""
                            }
                        }));
                    }}
                    getOptionLabel={(option) => option.nazov}
                    getOptionKey={(option) => option.id}
                    sx={{ mb: 2 }}
                    renderInput={(params) => <TextField
                        {...params}
                        label="Žáner"
                    />}
                />
            </>}
            applyFilters={applyFilters}
            resetFilters={resetFilters}
            filteredData={filteredData}
            pagination={<div>Pagination</div>}
        />
    );
}
