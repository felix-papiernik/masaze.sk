import { Role } from '@prisma/client';
import type { NextAuthConfig } from 'next-auth';
import { getToken } from 'next-auth/jwt';

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        async authorized({ request }) {

            const authToken = await getToken({ req: request, secret: process.env.SECRET });
            console.log("authToken: ", authToken)
            
            //you can get token like this (and verify it... :( ))
            //const { authToken } = (await request.json()) ?? {}
            
            if (!authToken) {
                return false;
                //return false;
            }

            const role: Role = authToken.role as Role;
            const forbiddenRoutes: { [key in Role]: string[] } = {
                SUPERADMIN: [],
                OWNER: ["/dashboard/roles"],
                MASSEUR: ["/dashboard/roles"],
                CLIENT: ["/dashboard/roles", "/dashboard/masaze"],
            };

            const pathname = request.nextUrl.pathname;
            const restrictedRoutes = forbiddenRoutes[role] || [];

            // Restrict access to forbidden routes
            if (restrictedRoutes.some(route => pathname.startsWith(route))) {
                console.log("can't access route ", pathname)
                return Response.redirect(new URL("/dashboard/", request.nextUrl).toString());
                //return false;
            }

            return true;
        },
        jwt: async ({ token, user }) => {
            //console.log("jwt")
            if (user) {
                //console.log("user in jwt")
                token.id = user.id;
                token.role = user.role; // Store role in token
            }
            console.log("return tokeb ", token)
            return token;
        },
        session: async ({ session, token }) => {
            if (session.user) {
                session.user.id = token.id;
                session.user.role = token.role; // Pass role to session
            }
            return session;
        },
    },
    providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;