import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const protectedRoutes = ['/mydashboard', '/dashboard', '/mypage'] satisfies readonly string[];
const publicRoutes = ['/faq', '/privacy', '/login', '/signup', '/'] satisfies readonly string[];

export const middleware = async (request: NextRequest) => {
  const pathname = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`));
  const isPublicRoute = publicRoutes.includes(pathname);

  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken');

  if (isProtectedRoute && !accessToken) {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }

  if (
    //
    isPublicRoute &&
    accessToken &&
    !request.nextUrl.pathname.startsWith('/mydashboard')
  ) {
    return NextResponse.redirect(new URL('/mydashboard', request.nextUrl));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'],
};
