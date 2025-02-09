import { SignupSuccessResponse } from '@/apis/users/types';
import axiosServerHelper from '@/utils/network/axiosServerHelper';
import errorResponse from '@/utils/network/errorResponse';
import { NextRequest, NextResponse } from 'next/server';

// 회원가입 요청
export const POST = async (request: NextRequest) => {
  try {
    const apiResponse = await axiosServerHelper.post<SignupSuccessResponse>('/users', await request.json());

    return NextResponse.json(apiResponse.data, {
      status: apiResponse.status,
    });
  } catch (error) {
    return errorResponse(error);
  }
};
