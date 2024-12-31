import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { Role } from '@prisma/client';
import { authConfig } from './auth.config';

const prisma = new PrismaClient();

export async function getUser(email: string) {
    return prisma.user.findUnique({ where: { email } });
}

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    pages: {
        signIn: '/prihlasenie',
    },
    providers: [
        CredentialsProvider({
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                console.log("SERVER FORM VALIDATION - authorize")
                const parsedCredentials = z.object({
                    email: z.string().email(),
                    password: z.string().min(8)
                }).safeParse(credentials);

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;
                    const user = await getUser(email);

                    const bcrypt = require('bcrypt');
                    if (user && (await bcrypt.compare(password, user.password))) {
                        const ret = {
                            id: user.id.toString(),
                            email: user.email,
                            role: user.role, // Include user role here
                        };
                        console.log("auth success, returning user object", ret)
                        return ret;
                    }
                }
                return null;
            }
        })
    ],
    secret: process.env.SECRET,
    session: {
        strategy: 'jwt',
    },
});
