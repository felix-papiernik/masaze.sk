"use client";

import { updateRole, updateUser } from '@/lib/actions';
import prisma, { USER } from '@/lib/prisma'
import { MenuItem, Select } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Role } from '@prisma/client';
import React, { useState } from 'react'

export default function UsersTable(props: { users: USER[] }) {

    const [users, setUsers] = useState(props.users);

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'firstName', headerName: 'Meno', width: 130 },
        { field: 'lastName', headerName: 'Priezvisko', width: 130 },
        {
            field: 'email',
            headerName: 'Email',
            width: 250,
        },
        {
            field: 'phone',
            headerName: 'Telefónne číslo',
            width: 150,
        },
        {
            field: 'role',
            headerName: 'Rola',
            width: 150,
            renderCell: (params) => {
                return (
                    <Select value={params.value} size='small' onChange={(e) => {
                        params.row.email != "felixpapiernik42@gmail.com" && updateUserRole(params.row.id, e.target.value);
                    }
                    }
                    disabled={params.row.email == "felixpapiernik42@gmail.com"}
                    >
                        <MenuItem value={Role.ADMIN}>Admin</MenuItem>
                        <MenuItem value={Role.MASSEUR}>Masér</MenuItem>
                        <MenuItem value={Role.CLIENT}>Klient</MenuItem>
                        <MenuItem value={Role.OWNER}>Majiteľ</MenuItem>
                    </Select>
                )

            }
        }
    ];

    const updateUserRole = async (userId: number, role: Role) => {
        const response = await updateRole(userId, role);
        if (response.success) {
            setUsers(users.map(user => user.id === userId ? { ...user, role } : user));
        }
    }

    const paginationModel = { page: 0, pageSize: 10 };

    return (
        <>
            <DataGrid
                rows={users}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[10]}
            />
        </>
    )
}
