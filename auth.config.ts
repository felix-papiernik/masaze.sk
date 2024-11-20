import { Prisma, PrismaClient, Role } from '@prisma/client';
import { url } from 'inspector';
import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        async authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;

            if (isLoggedIn && auth.user?.email) {
                if (nextUrl.pathname.startsWith('/login')) {
                    return Response.redirect(new URL('/dashboard', nextUrl));
                }
                const userEmail = auth.user?.email
                const fetchUrl = process.env.URL + `/api/get-user-role?email=${userEmail}`
                console.log("url to be fetched:" + fetchUrl)
                const role = await fetch(fetchUrl, {method: 'GET'} )
                .then(res => res.json())
                .then(data => data.role);

                if (role === "SUPERADMIN") {
                    return true;
                } else if (role === "OWNER" && !nextUrl.pathname.startsWith("/dashboard/roles")) {
                    console.log("owner request")
                    return true;
                } else if (role === "MASSEUR" && !nextUrl.pathname.startsWith("/dashboard/roles")) {
                    console.log("masseur request")
                    return true;
                } else if (role === "CLIENT" && !nextUrl.pathname.startsWith("/dashboard/roles")) {
                    console.log("client request")
                    return true;
                } else {
                    console.log("other request")
                    return false;
                }
            } else {
                // Redirect unauthenticated users to login page
                return false;
            }
        },
    },
    providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;