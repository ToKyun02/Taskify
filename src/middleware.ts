import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const AFTER_LOGIN_DOMAIN = ['/mydashboard', '/dashboard/:path*', '/dashboard', '/mypage'] satisfies readonly string[];
const BEFORE_LOGIN_DOMAIN = ['/faq', '/privacy', '/login', '/signup', '/'] satisfies readonly string[];

export const middleware = async (request: NextRequest) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken');
  if (!accessToken?.value) {
    if (AFTER_LOGIN_DOMAIN.includes(request.nextUrl.pathname)) return NextResponse.redirect(new URL('/login', request.url));
  } else {
    if (BEFORE_LOGIN_DOMAIN.includes(request.nextUrl.pathname)) return NextResponse.redirect(new URL('/mydashboard', request.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: '/:path*',
};
