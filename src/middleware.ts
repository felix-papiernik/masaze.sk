import NextAuth from 'next-auth';
import { authConfig } from '../auth.config';

export default NextAuth(authConfig).auth;

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
  matcher: '/((?!api|registracia|_next/static|_next/image|.*\\.png$|$|/).*)',
};