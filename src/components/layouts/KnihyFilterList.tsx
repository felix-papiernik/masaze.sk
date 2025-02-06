"use client";

import { KnihaGroupedData } from "@/lib/types";
import React, { useEffect, useState } from "react";
import FilterEntityLayout from "./FilterEntityLayout";
import { useRouter, useSearchParams } from "next/navigation";
import { Autocomplete, Pagination, Stack, TextField } from "@mui/material";

interface KnihyFilterListProps {
    knihy: KnihaGroupedData[];
    direction?: "row" | "column";
}
type AutocompleteData = {
    id: number | null;
    value: string;
};

const knihyPerPage = 6;

const defaultFilters = {
    nazov: "",
    autor: { id: null, value: "" } as AutocompleteData,
    zaner: { id: null, value: "" } as AutocompleteData,
    page: 1,
};

export default function KnihyFilterList({ knihy, direction }: KnihyFilterListProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
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
                        params[key] = { id: autor.id, value: `${autor.meno} ${autor.priezvisko}` };
                    }
                } else if (key === "zaner") {
                    const zaner = knihy.find((k) => k.data.zaner.id === Number(value))?.data.zaner;
                    if (zaner) {
                        params[key] = { id: zaner.id, value: zaner.nazov };
                    }
                } else if (key === "page") {
                    params.page = Number(value);
                }
            }
        }
        setCurrentFilterValues(params);
        setAppliedFilters(params);
    }, [searchParams]);


    // Funkcia na aplikovanie filtrov a úpravu URL
    const applyFilters = () => {
        setAppliedFilters(currentFilterValues);

        const filters: { [key: string]: string } = {};
        if (currentFilterValues.nazov) filters["nazov"] = currentFilterValues.nazov;
        if (currentFilterValues.autor.id !== null) filters["autor"] = String(currentFilterValues.autor.id);
        if (currentFilterValues.zaner.id !== null) filters["zaner"] = String(currentFilterValues.zaner.id);
        filters["page"] = "1";//po filtrovani reset

        const query = new URLSearchParams(filters).toString();
        router.push(`?${query}`);
    };

    const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
        setCurrentFilterValues((prev) => ({ ...prev, page: newPage }));
        setAppliedFilters((prev) => ({ ...prev, page: newPage }));

        const filters: { [key: string]: string } = {};
        if (appliedFilters.nazov) filters["nazov"] = appliedFilters.nazov;
        if (appliedFilters.autor.id !== null) filters["autor"] = String(appliedFilters.autor.id);
        if (appliedFilters.zaner.id !== null) filters["zaner"] = String(appliedFilters.zaner.id);
        filters["page"] = String(newPage);

        const query = new URLSearchParams(filters).toString();
        router.push(`?${query}`);
    };


    const resetFilters = () => {
        setAppliedFilters({ ...defaultFilters });
        setCurrentFilterValues({ ...defaultFilters });
        router.replace(window.location.pathname);
    };

    // Lokálna filtrácia dát
    const filteredData = knihy.filter((k) => {
        return Object.keys(defaultFilters).every((key) => {
            const value = appliedFilters[key as keyof typeof defaultFilters];
            if (!value ||
                (key !== "nazov" && (value as AutocompleteData).id === null)) return true;
            if (key === "nazov") {
                return k.data.nazov.toLowerCase().includes((value as string).toLowerCase());
            } else if (key === "autor") {
                console.log("k.data.autor.id and value", k.data.autor.id, (value as AutocompleteData).id);
                return k.data.autor.id === (value as AutocompleteData).id;
            } else if (key === "zaner") {
                return k.data.zaner.id === (value as AutocompleteData).id;
            }
            return true;
        });
    });


    const startIndex = (appliedFilters.page - 1) * knihyPerPage;
    const paginatedData = filteredData.slice(startIndex, startIndex + knihyPerPage);

    // Extrahovanie unikátnych autorov a žánrov pre Autocomplete
    const uniqueAutors = [...new Map(knihy.map((k) => [k.data.autor.id, k.data.autor])).values()].map((a) => ({
        id: a.id,
        value: `${a.meno} ${a.priezvisko}`,
    }));

    const uniqueZanre = [...new Map(knihy.map((k) => [k.data.zaner.id, k.data.zaner])).values()].map((z) => ({
        id: z.id,
        value: z.nazov,
    }));
    console.log("uniqueZanre", uniqueZanre);
    return (
        <FilterEntityLayout
            direction={direction || "row"}
            filters={
                <>
                    <TextField
                        label="Názov"
                        value={currentFilterValues.nazov}
                        onChange={(e) => setCurrentFilterValues((prev) => ({ ...prev, nazov: e.target.value }))}
                        sx={{ mb: 2, minWidth: "12rem" }}
                    />
                    <Autocomplete
                        value={uniqueAutors.find((a) => a.id === currentFilterValues.autor.id) || null}
                        options={uniqueAutors}
                        onChange={(event, newValue) => {
                            setCurrentFilterValues((prev) => ({
                                ...prev,
                                autor: newValue || { id: null, value: "" },
                            }));
                        }}
                        inputValue={currentFilterValues.autor.value}
                        onInputChange={(event, newInputValue) => {
                            console.log("newInputValue", newInputValue);
                            setCurrentFilterValues((prev) => ({
                                ...prev,
                                autor: { id: null, value: newInputValue },
                            }));
                        }}
                        getOptionLabel={(option) => option.value}
                        getOptionKey={(option) => option.id}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        sx={{ mb: 2, minWidth: "12rem" }}
                        renderInput={(params) => <TextField {...params} label="Autor" />}
                        noOptionsText="Nenašiel sa žiaden autor"
                    />
                    <Autocomplete
                        value={uniqueZanre.find((z) => z.id === currentFilterValues.zaner.id) || null}
                        options={uniqueZanre}
                        onChange={(event, newValue) => {
                            setCurrentFilterValues((prev) => ({
                                ...prev,
                                zaner: newValue || { id: null, value: "" },
                            }));
                        }}
                        inputValue={currentFilterValues.zaner.value}
                        onInputChange={(event, newInputValue) => {
                            console.log("newInputValue", newInputValue);
                            setCurrentFilterValues((prev) => ({
                                ...prev,
                                zaner: { id: null, value: newInputValue },
                            }));
                        }}
                        getOptionLabel={(option) => option.value}
                        getOptionKey={(option) => option.id}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        sx={{ mb: 2, minWidth: "12rem" }}
                        renderInput={(params) => <TextField {...params} label="Žáner" />}
                        noOptionsText="Nenašiel sa žiaden žáner"
                    />
                </>
            }
            applyFilters={applyFilters}
            resetFilters={resetFilters}
            filteredData={paginatedData}
            pagination={<Pagination sx={{ mt: 2 }}
                count={Math.ceil(filteredData.length / knihyPerPage)}
                page={appliedFilters.page}
                onChange={handlePageChange}
                color="primary"
            />}
        />
    );
}
