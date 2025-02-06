"use client";

import { ZanerGroupedData } from "@/lib/types";
import React, { useEffect, useState } from "react";
import FilterEntityLayout from "./FilterEntityLayout";
import { useRouter, useSearchParams } from "next/navigation";
import { Autocomplete, Pagination, TextField } from "@mui/material";

interface AutoriFilterListProps {
    zanre: ZanerGroupedData[];
    direction?: "row" | "column";
}
type ZanerAutocompleteData = {
    id: number | null;
    value: string;
};

const autoriPerPage = 4;

const defaultFilters = {
    zaner: { id: null, value: "" } as ZanerAutocompleteData,
    page: 1,
};

export default function ZanreFilterList({ zanre: initZanre, direction }: AutoriFilterListProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [currentFilterValues, setCurrentFilterValues] = useState({ ...defaultFilters });
    const [appliedFilters, setAppliedFilters] = useState({ ...defaultFilters });
    const [zanre, setZanre] = useState<ZanerGroupedData[]>(initZanre.map(zaner => ({
        ...zaner,
        edit: zaner.edit ? {
            ...zaner.edit,
            handleDelete: async () => {
                zaner.edit!.handleDelete();
                setZanre((prev) => prev.filter((a) => a.data.id !== zaner.data.id));
                applyFilters();
            }
        } : undefined
    })));

    useEffect(() => {
        const params: typeof defaultFilters = { ...defaultFilters };

        if (searchParams) {
            for (const [key, value] of searchParams.entries()) {
                if (key === "zaner") {
                    const zaner = zanre.find((a) => a.data.id === Number(value))?.data;
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
        if (currentFilterValues.zaner.id !== null) filters["zaner"] = String(currentFilterValues.zaner.id);
        filters["page"] = "1";//po filtrovani reset

        const query = new URLSearchParams(filters).toString();
        router.push(`?${query}`);
    };

    const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
        setCurrentFilterValues((prev) => ({ ...prev, page: newPage }));
        setAppliedFilters((prev) => ({ ...prev, page: newPage }));

        const filters: { [key: string]: string } = {};
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
    const filteredData = zanre.filter((a) => {
        return Object.keys(defaultFilters).every((key) => {
            const value = appliedFilters[key as keyof typeof defaultFilters];
            if (!value || (value as ZanerAutocompleteData).id === null) return true;
            if (key === "zaner") {
                return a.data.id === (value as ZanerAutocompleteData).id;
            }
            return true;
        });
    });


    const startIndex = (appliedFilters.page - 1) * autoriPerPage;
    const paginatedData = filteredData.slice(startIndex, startIndex + autoriPerPage);

    const uniqueZanre = [...new Map(zanre.map((z) => [z.data.id, z.data])).values()].map((a) => ({
        id: a.id,
        value: a.nazov,
    }));

    return (
        <>
            <FilterEntityLayout
                direction={direction || "row"}
                filters={
                    <>
                        <Autocomplete
                            value={uniqueZanre.find((a) => a.id === currentFilterValues.zaner.id) || null}
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
                            sx={{ mb: 2, minWidth: direction === "row" ? "100%" : "16rem" }}
                            renderInput={(params) => <TextField {...params} label="Žáner" />}
                            noOptionsText="Nenašiel sa žiaden žáner"
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
