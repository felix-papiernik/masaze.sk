import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { Role } from '@prisma/client';

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.SECRET });
    
    if (!token) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    const role = token?.role as Role;
    const forbiddenRoutes = {
        SUPERADMIN: [],
        OWNER: ["/dashboard/roles"],
        MASSEUR: ["/dashboard/roles"],
        CLIENT: ["/dashboard/roles", "/dashboard/masaze"],
    };

    const pathname = req.nextUrl.pathname;
    const restrictedRoutes = forbiddenRoutes[role] || [];
    
    if (restrictedRoutes.some(route => pathname.startsWith(route))) {
        return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*']
};