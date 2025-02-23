'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { isAxiosError } from 'axios';
import { login } from '@/apis/auth';
import { LoginFormData, loginSchema } from '@/apis/auth/types';

export const loginAction = async (formData: LoginFormData) => {
  const result = loginSchema.safeParse(formData);

  if (!result.success) {
    return {
      success: false,
      message: '양식을 확인해주세요',
    };
  }

  try {
    const { accessToken } = await login(formData);

    const cookieStore = await cookies();
    cookieStore.set({
      name: 'accessToken',
      value: accessToken,
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
    });

    revalidatePath('/');

    return {
      success: true,
      message: '로그인에 성공했습니다.',
    };
  } catch (error) {
    return {
      success: false,
      message: `${isAxiosError(error) ? error.response?.data.message : '알 수 없는 에러 발생'}`,
    };
  }
};
