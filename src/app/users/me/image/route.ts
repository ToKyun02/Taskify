import { CreateProfileImageSuccessResponse } from '@/apis/users/types';
import axiosServerHelper from '@/utils/network/axiosServerHelper';
import errorResponse from '@/utils/network/errorResponse';
import { NextRequest, NextResponse } from 'next/server';

// 프로필 이미지 업로드 요청
export const POST = async (request: NextRequest) => {
  try {
    const apiResponse = await axiosServerHelper.post<CreateProfileImageSuccessResponse>('/users/me/image', await request.formData(), {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return NextResponse.json(apiResponse.data, {
      status: apiResponse.status,
    });
  } catch (error) {
    return errorResponse(error);
  }
};
