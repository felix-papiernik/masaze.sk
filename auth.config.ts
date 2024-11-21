import { Role } from '@prisma/client';
import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        /**
         * 
         * @param param0 
         * @returns true, if the user is authorized to access the page, false otherwise. 
         * If the user is not authorized, the user will be redirected to the login page.
         */
        async authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;

            if (isLoggedIn && auth.user?.email) {
                const callbackUrl = nextUrl.searchParams.get('callbackUrl');
                if (nextUrl.pathname === '/login' && callbackUrl === null) {
                    return Response.redirect(new URL('/dashboard', nextUrl));
                }
                const userEmail = auth.user?.email
                const fetchUrl = process.env.URL + `/api/get-user-role?email=${userEmail}`
                console.log("url to be fetched:" + fetchUrl)
                const role = await fetch(fetchUrl, { method: 'GET' })
                    .then(res => res.json())
                    .then(data => data.role);

                const forbiddenRoutes: { [key in Role]: string[] } = {
                    SUPERADMIN: [],
                    OWNER: ["/dashboard/roles"],
                    MASSEUR: ["/dashboard/roles"],
                    CLIENT: ["/dashboard/roles", "/dashboard/masaze"],
                }

                let canAccess = true;

                if (callbackUrl) {
                    console.log("new URL from callback:", new URL(callbackUrl).toString())
                    //return Response.redirect(new URL(callbackUrl));
                }

                forbiddenRoutes[role as Role].forEach(route => {
                    if (nextUrl.pathname.startsWith(route)
                        || (callbackUrl && new URL(callbackUrl).toString().startsWith(route))
                    ) {
                        console.log(role + " is not allowed to access " + nextUrl.pathname)
                        canAccess = false;
                    }
                })

                if (!canAccess) {
                    return Response.redirect(new URL('/dashboard', nextUrl));
                }
                return callbackUrl ? Response.redirect(new URL(callbackUrl)) : true;
            } else {
                // Redirect unauthenticated users to login page
                return false;
            }
        },
        session: ({ session, token }) => ({
            ...session,
            user: {
              ...session.user,
              id: token.sub,
            },
          }),
        jwt: async ({ user, token }) => {
            if (user) {
                token.uid = user.id;
            }
            return token;
        },
    },
    session: {
        strategy: 'jwt',
    },
    providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;

