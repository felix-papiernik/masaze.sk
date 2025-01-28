"use client";

import { Grid2 } from "@mui/material";
import React, {  } from "react";
import EntityCard from "./EntityCard";
import { EntityGroupedData } from "@/lib/types";


export default function EntityList(props: { data: EntityGroupedData[] }) {

    return (
        <>
            {props.data.length == 0 ?
                <p>Mrzí nás to, no momentálne v systéme nemáme TODO :(</p>
                :
                <Grid2 container columns={{ xs: 1, md: 2, lg: 4 }} spacing={2}>
                    {props.data.map((entity) => (
                        <Grid2 key={entity.data.id} size={1}>
                            <EntityCard
                                entityGroupedData={entity}
                            />
                        </Grid2>
                    ))}
                </Grid2>
            }
        </>
    )
}
