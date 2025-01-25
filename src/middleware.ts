import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { EntityData } from './lib/types';
import { verifyToken } from './lib/utils';
import { verifySession } from './lib/actions';

const paths = {

}

export async function middleware(req: NextRequest) {
  console.log("middleware run")
  const auth = await verifySession();

  if (!auth) {
    console.log("redirecting to /prihlasenie from middleware")
    return NextResponse.redirect(new URL('/prihlasenie', req.url));
  }

  try {
    const path = req.nextUrl.pathname;
    if (path.startsWith("/prihlasenie") || path.endsWith("/u")) {
      return NextResponse.redirect(new URL('/u/nastenka', req.url));
    } else if (path.startsWith("/u/moje-knihy") || path.startsWith("/u/moj-ucet")) {
      return NextResponse.next();
    } else if (auth.pouzivatel.je_admin == false && path.startsWith("/u/admin")) {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    } else if (auth.pouzivatel.je_admin == true && path.endsWith("/u/admin")) {
      return NextResponse.redirect(new URL('/u/admin/knihy', req.url));
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
  matcher: ['/dashboard/:path*', '/u/:path*'],
};