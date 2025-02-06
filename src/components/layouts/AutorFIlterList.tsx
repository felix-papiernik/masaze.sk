"use client";

import { AutorGroupedData } from "@/lib/types";
import React, { useEffect, useState } from "react";
import FilterEntityLayout from "./FilterEntityLayout";
import { useRouter, useSearchParams } from "next/navigation";
import { Autocomplete, Pagination, TextField } from "@mui/material";

interface AutoriFilterListProps {
    autori: AutorGroupedData[];
    direction?: "row" | "column";
}
type AutorAutocompleteData = {
    id: number | null;
    value: string;
};

const autoriPerPage = 6;

const defaultFilters = {
    autor: { id: null, value: "" } as AutorAutocompleteData,
    page: 1,
};

export default function AutoriFilterList({ autori: propsAutori, direction }: AutoriFilterListProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [currentFilterValues, setCurrentFilterValues] = useState({ ...defaultFilters });
    const [appliedFilters, setAppliedFilters] = useState({ ...defaultFilters });
    const [autori, setAutori] = useState<AutorGroupedData[]>(propsAutori.map(autor => ({
        ...autor,
        edit: autor.edit ? {
            ...autor.edit,
            handleDelete: async () => {
                autor.edit!.handleDelete();
                setAutori((prev) => prev.filter((a) => a.data.id !== autor.data.id));
                applyFilters();
            }
        } : undefined
    })));

    useEffect(() => {
        const params: typeof defaultFilters = { ...defaultFilters };

        if (searchParams) {
            for (const [key, value] of searchParams.entries()) {
                if (key === "autor") {
                    const autor = autori.find((a) => a.data.id === Number(value))?.data;
                    if (autor) {
                        params[key] = { id: autor.id, value: `${autor.meno} ${autor.priezvisko}` };
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
        if (currentFilterValues.autor.id !== null) filters["autor"] = String(currentFilterValues.autor.id);
        filters["page"] = "1";//po filtrovani reset

        const query = new URLSearchParams(filters).toString();
        router.push(`?${query}`);
    };

    const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
        setCurrentFilterValues((prev) => ({ ...prev, page: newPage }));
        setAppliedFilters((prev) => ({ ...prev, page: newPage }));

        const filters: { [key: string]: string } = {};
        if (appliedFilters.autor.id !== null) filters["autor"] = String(appliedFilters.autor.id);
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
    const filteredData = autori.filter((a) => {
        return Object.keys(defaultFilters).every((key) => {
            const value = appliedFilters[key as keyof typeof defaultFilters];
            if (!value || (value as AutorAutocompleteData).id === null) return true;
            if (key === "autor") {
                console.log("k.data.autor.id and value", a.data.id, (value as AutorAutocompleteData).id);
                return a.data.id === (value as AutorAutocompleteData).id;
            }
            return true;
        });
    });


    const startIndex = (appliedFilters.page - 1) * autoriPerPage;
    const paginatedData = filteredData.slice(startIndex, startIndex + autoriPerPage);

    const uniqueAutors = [...new Map(autori.map((a) => [a.data.id, a.data])).values()].map((a) => ({
        id: a.id,
        value: `${a.meno} ${a.priezvisko}`,
    }));

    return (
        <>
            <FilterEntityLayout
                direction={direction || "row"}
                filters={
                    <>
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
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            sx={{ mb: 2, minWidth: direction === "row" ? "100%" : "16rem" }}
                            renderInput={(params) => <TextField {...params} label="Autor" />}
                            noOptionsText="Nenašiel sa žiaden autor"
                        />
                    </>
                }
                applyFilters={applyFilters}
                resetFilters={resetFilters}
                filteredData={paginatedData}
                pagination={<Pagination sx={{ mt: 2 }}
                    count={Math.ceil(filteredData.length / autoriPerPage)}
                    page={appliedFilters.page}
                    onChange={handlePageChange}
                    color="primary"
                />}
            />
        </>
    );
}
