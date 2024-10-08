import type { NextRequest } from 'next/server';
import { getToken, JWT } from 'next-auth/jwt';
import { UserRole } from './constants/enums';
import { PrivateRoutes, PublicRoutes } from './constants/routes';

export type Token = JWT & {
  role: UserRole;
};

export async function middleware(request: NextRequest) {
  const token = (await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  })) as Token | null;

  const { pathname } = request.nextUrl;

  // Helper function to check if a route matches either a string or RegExp
  const isRouteMatch = (routes: (string | RegExp)[], path: string) => {
    return routes.some((route) => {
      if (typeof route === 'string') {
        return path === route; // Exact match for string routes
      } else if (route instanceof RegExp) {
        return route.test(path); // Match using RegExp
      }
      return false;
    });
  };

  // 1. Check if the route is a public route
  if (isRouteMatch(PublicRoutes, pathname)) return; // Public route, allow access

  // 2. If not a public route, check if the user is authenticated (has a token)
  if (!token) {
    if (pathname !== '/login') {
      return Response.redirect(new URL('/login', request.nextUrl));
    }
    return; // Allow access to login page if unauthenticated
  }

  // 3. If authenticated, prevent access to login/signup pages
  if (token && (pathname === '/login' || pathname === '/signup')) {
    return Response.redirect(new URL('/', request.nextUrl));
  }

  // 4. Check if the route is private and if the user has access based on their role
  const userRoleRoutes = PrivateRoutes[token.role] || [];

  // 5. Redirect if the user doesn't have access to the private route
  if (!isRouteMatch(userRoleRoutes, pathname)) {
    return Response.redirect(new URL('/', request.nextUrl)); // Redirect to homepage or "no access" page
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images).*)'],
};
