import React from 'react'
import KnihaForm from '../KnihaForm'
import prisma from '@/lib/prisma'

export default async function page() {

    const autori = await prisma.autor.findMany()
    const zanre = await prisma.zaner.findMany()

    return (
        <KnihaForm autori={autori} zanre={zanre}/>
    )
}
