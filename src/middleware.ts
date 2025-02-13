import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const AFTER_LOGIN_DOMAIN = ['/mydashboard', '/dashboard', '/mypage'] satisfies readonly string[];
const BEFORE_LOGIN_DOMAIN = ['/faq', '/privacy', '/login', '/signup', '/'] satisfies readonly string[];

export const middleware = async (request: NextRequest) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken');

  const pathname = request.nextUrl.pathname;

  if (!accessToken?.value) {
    if (AFTER_LOGIN_DOMAIN.some((path) => pathname.startsWith(path))) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  } else {
    if (BEFORE_LOGIN_DOMAIN.includes(pathname)) {
      return NextResponse.redirect(new URL('/mydashboard', request.url));
    }
  }

  return NextResponse.next();
};

export const config = {
  matcher: [
    {
      source: '/:path*',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
};
