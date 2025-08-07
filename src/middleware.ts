import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const isAuthenticatedCookie = request.cookies.get('isAuthenticated')?.value;
  const isAuthenticated = isAuthenticatedCookie === 'true';
  const path = request.nextUrl.pathname;

  console.log('🔍 Middleware check:', {
    path,
    isAuthenticated,
    cookie: isAuthenticatedCookie,
  });

  const isLoginPage = path === '/login';
  const isProtectedPage = path.startsWith('/admin');
  const isApiRoute = path.startsWith('/api');
  const isStaticFile = path.startsWith('/_next') || path === '/favicon.ico';

  // Skip middleware for API routes and static files
  if (isApiRoute || isStaticFile) {
    return NextResponse.next();
  }

  // Redirect authenticated users away from login page
  if (isAuthenticated && isLoginPage) {
    console.log('✅ Authenticated user on login page, redirecting to home');
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Redirect unauthenticated users from protected pages
  if (!isAuthenticated && isProtectedPage) {
    console.log(
      '❌ Unauthenticated user on protected page, redirecting to login'
    );
    return NextResponse.redirect(
      new URL(`/login?from=${encodeURIComponent(path)}`, request.url)
    );
  }

  console.log('✅ Middleware passed, continuing...');
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
