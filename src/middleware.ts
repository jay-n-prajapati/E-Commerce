import type { NextRequest } from 'next/server';
import { getToken, JWT } from 'next-auth/jwt';
import { hasAccessToURL } from './lib/utils';
import { UserRole } from './constants/enums';

export type Token = JWT & {
  role: UserRole;
};

export async function middleware(request: NextRequest) {
  const token = (await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  })) as Token;

  // const hasAccess = await hasAccessToURL(request, token?.role);

  // if (hasAccess) return

  if (!token && request.nextUrl.pathname === 'signup') {
    return;
  }

  // if (!token && request.nextUrl.pathname !== '/login') {
  //   return Response.redirect(new URL('/login', request.nextUrl));
  // }
  if (token && request.nextUrl.pathname === '/login') {
    return Response.redirect(new URL('/', request.nextUrl));
  }

  // need optimization here
  // if (!hasAccess) {
  //   return Response.redirect(new URL('/', request.nextUrl));
  // }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images).*)'],
};
