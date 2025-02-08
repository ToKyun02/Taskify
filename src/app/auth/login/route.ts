import { LoginSuccessResponse } from '@/apis/auth/types';
import axiosServerHelper from '@/utils/network/axiosServerHelper';
import { isAxiosError } from 'axios';
import { isError } from 'es-toolkit/compat';
import { NextRequest, NextResponse } from 'next/server';

// 로그인 요청
export const POST = async (request: NextRequest) => {
  try {
    const apiResponse = await axiosServerHelper.post<LoginSuccessResponse>('/auth/login', await request.json());

    const response = NextResponse.json(apiResponse.data.user, {
      status: apiResponse.status,
    });

    response.cookies.set('accessToken', apiResponse.data.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
    });

    return response;
  } catch (error) {
    if (isAxiosError(error)) {
      return NextResponse.json(error.response?.data, {
        status: error.response?.status ?? 500,
      });
    }
    return NextResponse.json(
      {
        message: isError(error) ? error.message : String(error),
      },
      { status: 500 },
    );
  }
};
