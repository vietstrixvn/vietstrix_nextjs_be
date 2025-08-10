import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { logDebug, logError } from './utils';

export function middleware(request: NextRequest) {
  const isAuthenticatedCookie = request.cookies.get('isAuthenticated')?.value;
  const userRoleCookie = request.cookies.get('userRole')?.value; // Thêm dòng này
  const isAuthenticated = isAuthenticatedCookie === 'true';
  const path = request.nextUrl.pathname;

  logDebug('🔍 Middleware check:', {
    path,
    isAuthenticated,
    userRole: userRoleCookie, // Thêm vào log
    cookie: isAuthenticatedCookie,
  });

  const isLoginPage = path === '/sign-in';
  const isProtectedPage = path.startsWith('/admin');
  const isUserPage = path.startsWith('/user'); // Thêm dòng này
  const isSeoPage = path === '/seo'; // Thêm dòng này
  const isApiRoute = path.startsWith('/api');
  const isStaticFile = path.startsWith('/_next') || path === '/favicon.ico';

  // Skip middleware for API routes and static files
  if (isApiRoute || isStaticFile) {
    return NextResponse.next();
  }

  // Redirect authenticated users away from login page
  if (isAuthenticated && isLoginPage) {
    logDebug('✅ Authenticated user on login page, redirecting to home');
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Redirect unauthenticated users from protected pages
  if (!isAuthenticated && (isProtectedPage || isUserPage || isSeoPage)) {
    // Update điều kiện này
    logError('❌ Unauthenticated user on protected page, redirecting to login');
    return NextResponse.redirect(
      new URL(`/sign-in?from=${encodeURIComponent(path)}`, request.url)
    );
  }

  // Block manager role from accessing user pages and SEO page - Thêm block này
  if (
    isAuthenticated &&
    userRoleCookie === 'manager' &&
    (isUserPage || isSeoPage)
  ) {
    logError('🚫 Manager role blocked from accessing:', path);
    return NextResponse.redirect(new URL('/unauthorized', request.url)); // Hoặc redirect về trang chính
  }

  logDebug('✅ Middleware passed, continuing...');
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
