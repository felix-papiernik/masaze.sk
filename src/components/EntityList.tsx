import React from 'react'

interface EntityListProps<T> {
    data: T[]
    type: "kniha" | "autor" | "zaner"
    filterOptions?: {
        queryFieldName: string[],
        filterFunction: (query: string, data: T) => boolean
    }

}

export default function EntityList() {
    return (
        <div>EntityList</div>
    )
}
