import { Grid2, Typography } from "@mui/material";
import React, { } from "react";
import EntityCard from "./EntityCard";
import { EntityGroupedData } from "@/lib/types";


export default function EntityList(props: { data: EntityGroupedData[], notFoundElement?: JSX.Element, notFoundMessage?: string }) {

    const type = props.data[0]?.type
    const lgColumns = type === "kniha" ? 4 : type === "kniha_pouzivatel" ? 2 : 3

    return (
        <>
            {props.data.length == 0 ?
                <>
                    {props.notFoundElement ? props.notFoundElement :
                        <Typography variant="body1">{props.notFoundMessage || "Nenašli sa žiadne záznamy"}</Typography>
                    }
                </>
                :
                <Grid2 container columns={{ xs: 1, md: 2, lg: lgColumns }} spacing={2}>
                    {props.data.map((entity) => (
                        <Grid2 key={entity.data.id} size={1} >
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
