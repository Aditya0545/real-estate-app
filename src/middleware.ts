import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token') || request.headers.get('Authorization');
  const isAuthPage = request.nextUrl.pathname.startsWith('/sign-in') || 
                     request.nextUrl.pathname.startsWith('/sign-up');

  if (!token && !isAuthPage) {
    // Redirect to login if trying to access protected route without token
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  if (token && isAuthPage) {
    // Redirect to dashboard if trying to access auth pages while logged in
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/sign-in',
    '/sign-up'
  ]
}; 