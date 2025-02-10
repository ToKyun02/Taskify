import axiosClientHelper from '@/utils/network/axiosClientHelper';
import { LoginFormData, LoginResponse, loginResponseSchema, PutPasswordFormData } from './types';
import { isAxiosError } from 'axios';
import { isError } from 'es-toolkit/compat';

export const login = async (loginFormData: LoginFormData): LoginResponse => {
  try {
    const response = await axiosClientHelper.post('/auth/login', loginFormData);

    const result = loginResponseSchema.safeParse(response.data);
    if (!result.success) {
      throw new Error('서버에서 받은 데이터가 예상과 다릅니다.');
    }
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) return error.response?.data;
    return { message: isError(error) ? error.message : String(error) };
  }
};

export const putPassword = async (putPasswordFormData: PutPasswordFormData) => {
  await axiosClientHelper.put<void>('/auth/password', putPasswordFormData);
};

export const logout = async () => {
  await axiosClientHelper.post<void>('/auth/logout');
};
