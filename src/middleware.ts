import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { redirectUrlAfterLogin } from './lib/utils';
import { verifySession } from './lib/actions';

export async function middleware(req: NextRequest) {
  console.log("middleware run")
  const auth = await verifySession();
  const path = req.nextUrl.pathname;

  if (auth) {
    const dashUrl = redirectUrlAfterLogin(auth.pouzivatel.je_admin)

    // Prevent authenticated users from accessing login/registration/bad routes
    if (path.startsWith("/prihlasenie") || path.startsWith("/registracia") || path.endsWith("/u")
      || (auth.pouzivatel.je_admin && path === "/u/admin")) {
      return NextResponse.redirect(new URL(dashUrl, req.url));
    }

    // Prevent authenticated users from accessing login/registration
    if (path.startsWith("/prihlasenie") || path.startsWith("/registracia")) {
      return NextResponse.redirect(new URL(dashUrl, req.url));
    }

    // Prevent citatel from accessing admin routes
    if (auth.pouzivatel.je_admin == false && path.startsWith("/u/admin")) {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }

    return NextResponse.next();
  } else if (!auth && !path.startsWith("/prihlasenie") && !path.startsWith("/registracia")) {
    console.log("redirecting to /prihlasenie from middleware")
    return NextResponse.redirect(new URL('/prihlasenie', req.url));
  }
  console.log("nextResponse.next")
  return NextResponse.next();
}

/**
 * The advantage of employing Middleware for this task is that the protected routes 
 * will not even start rendering until the Middleware verifies the authentication, 
 * enhancing both the security and performance of your application.
 */
export const config = {
  matcher: ['/dashboard/:path*', '/u/:path*', '/registracia', '/prihlasenie'],
};