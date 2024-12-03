import { Role } from '@prisma/client';
import type { NextAuthConfig } from 'next-auth';
import { getToken } from 'next-auth/jwt';

export const authConfig = {
    pages: {
        signIn: '/prihlasenie',
    },
    callbacks: {
        async authorized({ request }) {

            const authToken = await getToken({ req: request, secret: process.env.SECRET });
            //console.log("authToken: ", authToken)

            const { pathname, searchParams } = request.nextUrl;

            //you can get token like this (and verify it... :( ))
            //const { authToken } = (await request.json()) ?? {}

            if (!authToken && pathname.startsWith("/registracia")) {
                return true;
            } else if (!authToken) {
                return false;
            } else if (authToken && (pathname.startsWith('/prihlasenie') || pathname.startsWith('/registracia'))) {
                const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
                return Response.redirect(new URL(callbackUrl, request.url));
            }

            const role: Role = authToken.role as Role;
            const forbiddenRoutes: { [key in Role]: string[] } = {
                SUPERADMIN: [],
                OWNER: ["/dashboard/roles"],
                MASSEUR: ["/dashboard/roles"],
                CLIENT: ["/dashboard/roles", "/dashboard/masaze"],
            };

            const restrictedRoutes = forbiddenRoutes[role] || [];

            // Restrict access to forbidden routes
            if (restrictedRoutes.some(route => pathname.startsWith(route))) {
                console.log("can't access route ", pathname)
                return Response.redirect(new URL("/dashboard/", request.nextUrl).toString());
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
            //console.log("return token: ", token)
            return token;
        },
        session: async ({ session, token }) => {
            //this didn't provide role, for some reason it set role always to CLIENT
            // if (session.user) {
            //     session.user.id = token.id;
            //     session.user.role = token.role; // Pass role to session
            // }
            if (session) {
                session.user.id = token.id;
                session.user.role = token.role;
            } else {
                console.log("NO SESSION")
            }
            return session;
        },
    },
    providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;