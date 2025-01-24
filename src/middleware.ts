import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { EntityData } from './lib/types';
import { verifyToken } from './lib/utils';

const paths = {

}

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

    if (typeof decoded !== 'object') {
      throw new Error('Invalid token structure');
    }

    const entity = decoded as EntityData;

    console.log("middleware entity", entity)

    // Kontrola prístupu na základe role todo
    const path = req.nextUrl.pathname;
    if (entity && path.startsWith("/prihlasenie")) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
    if (entity.entity == "klient" && !path.startsWith("/dashboard") && !path.startsWith("/my-account")) {
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
  matcher: ['/dashboard/:path*', '/admin/:path*', '/protected/:path*'],
};