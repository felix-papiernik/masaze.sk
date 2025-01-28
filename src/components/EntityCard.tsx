import { autor, kniha, zaner } from '@prisma/client'
import React from 'react'

type Entities = { type: "kniha", entity: kniha } | { type: "autor", entity: autor } | { type: "zaner", entity: zaner }

type EntityCardProps = {
    entity: Entities,
    editable: {
        editUrl: string,
        handleDelete: () => void
    }
}

export default function EntityCard(props: EntityCardProps) {
    return (
        <div>EntityCard</div>
    )
}
