import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { logDebug } from './utils';
import { validateUserRole } from './store/auth/utils.auth';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isAuthenticated =
    request.cookies.get('isAuthenticated')?.value === 'true';

  logDebug(
    'Path:',
    path,
    'Role:',
    request.cookies.get('userRole')?.value,
    'isAuth:',
    isAuthenticated
  );

  const isLoginPage = path === '/sign-in';
  const isUnauthorizedPage = path === '/admin/unauthorized';
  const isApiRoute = path.startsWith('/api');
  const isStaticFile = path.startsWith('/_next') || path === '/favicon.ico';

  if (isApiRoute || isStaticFile || isLoginPage || isUnauthorizedPage) {
    return NextResponse.next();
  }

  // Auth check && Route Auth
  if (
    (path === '/admin/user' || path.startsWith('/admin/user/')) &&
    !validateUserRole(request, ['admin']) // chỉ admin mới vào được
  ) {
    return NextResponse.redirect(new URL('/admin/unauthorized', request.url));
  }

  if (
    (path === '/admin/website' || path.startsWith('/admin/website/')) &&
    !validateUserRole(request, ['admin']) // chỉ admin mới vào được
  ) {
    return NextResponse.redirect(new URL('/admin/unauthorized', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
