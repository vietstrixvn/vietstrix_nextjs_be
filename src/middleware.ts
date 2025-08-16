import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { validateUserRole } from './store/auth/utils.auth';
import { publicRoutes, REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE } from './lib';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isLoginPage = path === '/sign-in';
  const isUnauthorizedPage = path === '/admin/unauthorized';
  const isApiRoute = path.startsWith('/api');

  const isStaticFile =
    path.startsWith('/_next') ||
    path.startsWith('/icons') ||
    path.startsWith('/images') ||
    path.startsWith('/.well-known') ||
    path.endsWith('.ico') ||
    path.endsWith('.png') ||
    path.endsWith('.svg') ||
    path.endsWith('.jpg') ||
    path.endsWith('.json');

  // Skip mấy route public / API / static / login / unauthorized
  if (
    publicRoutes.some(
      (route) => path === route || path.startsWith(`${route}/`)
    ) ||
    isApiRoute ||
    isStaticFile ||
    isLoginPage ||
    isUnauthorizedPage
  ) {
    return NextResponse.next();
  }

  const token = request.cookies.get('refresh-token')?.value;

  // Nếu chưa có token → redirect sang sign-in
  if (!token) {
    return NextResponse.redirect(
      new URL(
        `${REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE}?redirect=${encodeURIComponent(path)}`,
        request.url
      )
    );
  }

  // Check quyền admin
  if (
    ['/admin/user', '/admin/website'].some(
      (r) => path === r || path.startsWith(`${r}/`)
    ) &&
    !validateUserRole(request, ['admin'])
  ) {
    return NextResponse.redirect(new URL('/admin/unauthorized', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
