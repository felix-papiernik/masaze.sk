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
}

export function UserProvider({ children }: UserProviderProps) {
    const [user, setUser] = useState<User | null>(null);

    // Dekódovanie tokenu z cookies pri prvom načítaní
    useEffect(() => {
        const fetchUserFromToken = async () => {
            const cookie = document.cookie
                .split('; ')
                .find((row) => row.startsWith('auth_token='))
                ?.split('=')[1];

            if (cookie) {
                try {
                    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
                    const { payload } = await jwtVerify(cookie, secret);
                    //setUser(payload as User);
                    console.log("payload from refresh context", payload)
                } catch (err) {
                    console.error('Invalid token', err);
                }
            }
        };

        fetchUserFromToken();
        //console.log("user from context", user)
    }, []);

    return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
}

export function useUser() {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}