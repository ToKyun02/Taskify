import axiosServerHelper from '@/utils/network/axiosServerHelper';
import { isAxiosError } from 'axios';
import { isError } from 'es-toolkit/compat';
import { NextRequest, NextResponse } from 'next/server';

// 비밀번호 수정 요청
export const PUT = async (request: NextRequest) => {
  try {
    const apiResponse = await axiosServerHelper.put<void>('/auth/password', await request.json());

    return new NextResponse(null, {
      status: apiResponse.status,
    });
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
