import prisma from '@/lib/prisma'
import React from 'react'

export default async function Autori() {

    const autori = await prisma.autor.findMany()

    return (
        <>
            <h1>Autori</h1>{
                autori.length == 0 ? (
                    <p>Mrzí nás to, no momentálne v systéme nemáme žiadnych autorov :(</p>
                ) : (
                    <ul>{
                        autori.map(autor => (
                            <li key={autor.id}>{autor.meno} {autor.priezvisko}</li>
                        ))
                    }</ul>
                )
            }
        </>
    )
}
