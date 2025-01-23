"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User } from '@prisma/client';
import { jwtVerify } from 'jose/jwt/verify';

interface UserContextType {
    user: User | null;
    setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
    children: ReactNode;
    initialUser?: User | null; // Serverom inicializovaný používateľ
}

export function UserProvider({ children, initialUser }: UserProviderProps) {
    const [user, setUser] = useState<User | null>(initialUser || null);

    return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
}

export function useUser() {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}