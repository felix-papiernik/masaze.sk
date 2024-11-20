import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { PrismaClient, User } from '@prisma/client';
import { z } from 'zod';


/**
 * https://nextjs.org/learn/dashboard-app/adding-authentication
 */
async function getUser(email: string): Promise<User | null> {
    try {
        const prisma = new PrismaClient();
        const user = await prisma.user.findUnique({
            where: { email }
        })
        return user;
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}

/**
 * https://nextjs.org/learn/dashboard-app/adding-authentication
 */
export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(8) })
                    .safeParse(credentials);

                console.log(parsedCredentials)

                if (parsedCredentials.success) {
                    console.log("success")
                    const { email, password } = parsedCredentials.data;
                    const user = await getUser(email);
                    if (!user) return null;
                    const bcrypt = require('bcrypt');
                    const passwordsMatch = await bcrypt.compare(password, user.password);

                    //Map Prisma user to NextAuth user format
                    if (passwordsMatch) {
                        return {
                            id: user.id.toString(), // Convert `id` to string
                            email: user.email,
                            name: `${user.firstName} ${user.lastName}`,
                            role: user.role,
                        };
                    }
                }

                console.log('Invalid credentials');
                return null;
            },
        }),
    ],
});