import axiosServerHelper from '@/utils/network/axiosServerHelper';
import errorResponse from '@/utils/network/errorResponse';
import { NextRequest, NextResponse } from 'next/server';

// 비밀번호 수정 요청
export const PUT = async (request: NextRequest) => {
  try {
    const apiResponse = await axiosServerHelper.put<void>('/auth/password', await request.json());

    return new NextResponse(null, {
      status: apiResponse.status,
    });
  } catch (error) {
    return errorResponse(error);
  }
};
