import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

import { NextRequest } from 'next/server';
import { UserTokenPayload } from './schema/TokenPayload';
import { verifyToken } from './lib/jwt';



export async function middleware(req: NextRequest) {
  // Získaj cookies z požiadavky
  const cookie = req.headers.get('cookie');
  const token = cookie?.split('; ').find((c) => c.startsWith('auth_token='))?.split('=')[1];

  console.log("middleware run")

  // Ak token neexistuje, presmeruj na prihlasovaciu stránku
  if (!token) {
    return NextResponse.redirect(new URL('/prihlasenie', req.url));
  }

  try {
    // Over JWT token
    //const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    const decoded = await verifyToken(token, process.env.JWT_SECRET as string)

    if (typeof decoded !== 'object' || !('role' in decoded)) {
      throw new Error('Invalid token structure');
    }

    const user = decoded as UserTokenPayload;

    console.log("middleware user", user)

    // Kontrola prístupu na základe role
    const path = req.nextUrl.pathname;
    if (path.startsWith('/dashboard') && user.email !== 'felixpapiernik42@gmail.com') {
      return NextResponse.redirect(new URL('/403', req.url)); // Ak nie je admin, presmeruj na 403
    }

    // Ak má používateľ prístup, pokračuj na URL
    return NextResponse.next();
  } catch (err) {
    console.log("error in middleware", err)
    // Ak token nie je platný alebo je expirovaný, presmeruj na login
    return NextResponse.redirect(new URL('/prihlasenie', req.url));
  }
}

/**
 * The advantage of employing Middleware for this task is that the protected routes 
 * will not even start rendering until the Middleware verifies the authentication, 
 * enhancing both the security and performance of your application.
 */
export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
  // matcher: '/((?!api|_next/static|_next/image|.*\\.png$|$|/).*)',
  //naposledy matcher: '/((?!api|_next/static|_next/image|.*\\.png$|$|/).*)',
  matcher: ['/dashboard/:path*', '/admin/:path*', '/protected/:path*'],
};