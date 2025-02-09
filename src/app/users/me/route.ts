import { User } from '@/apis/users/types';
import axiosServerHelper from '@/utils/network/axiosServerHelper';
import errorResponse from '@/utils/network/errorResponse';
import { NextRequest, NextResponse } from 'next/server';

// 내 정보 조회 요청
export const GET = async () => {
  try {
    const apiResponse = await axiosServerHelper.get<User>('/users/me');

    return NextResponse.json(apiResponse.data, {
      status: apiResponse.status,
    });
  } catch (error) {
    return errorResponse(error);
  }
};

// 내 정보 수정 요청
export const PUT = async (request: NextRequest) => {
  try {
    const apiResponse = await axiosServerHelper.put<User>('/users/me', await request.json());

    return NextResponse.json(apiResponse.data, {
      status: apiResponse.status,
    });
  } catch (error) {
    return errorResponse(error);
  }
};
