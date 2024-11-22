import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { Role } from '@prisma/client';

const prisma = new PrismaClient();

export async function getUser(email: string) {
    return prisma.user.findUnique({ where: { email } });
}

export default NextAuth({
    providers: [
        CredentialsProvider({
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                const parsedCredentials = z.object({
                    email: z.string().email(),
                    password: z.string().min(8)
                }).safeParse(credentials);

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;
                    const user = await getUser(email);

                    const bcrypt = require('bcrypt');
                    if (user && (await bcrypt.compare(password, user.password))) {
                        return {
                            id: user.id.toString(),
                            email: user.email,
                            role: user.role, // Include user role here
                        };
                    }
                }
                return null;
            }
        })
    ],
    pages: {
        signIn: '/login',
    },
    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) {
                token.id = user.id;
                token.role = user.role; // Store role in token
            }
            return token;
        },
        session: async ({ session, token }) => {
            if (session.user) {
                session.user.id = token.id;
                session.user.role = token.role; // Pass role to session
            }
            return session;
        },
        async authorized({ token, req }) {
            if (!token) return false;

            const role : Role = token.role;
            const forbiddenRoutes: { [key in Role]: string[] } = {
                SUPERADMIN: [],
                OWNER: ["/dashboard/roles"],
                MASSEUR: ["/dashboard/roles"],
                CLIENT: ["/dashboard/roles", "/dashboard/masaze"],
            };

            const pathname = req.nextUrl.pathname;
            const restrictedRoutes = forbiddenRoutes[role] || [];

            console.log("route: ", pathname);
            // Restrict access to forbidden routes
            if (restrictedRoutes.some(route => pathname.startsWith(route))) {
                console.log(pathname, " starts with ");
                return false;
            }

            return true;
        },
    },
    secret: process.env.SECRET,
    session: {
        strategy: 'jwt',
    },
});
