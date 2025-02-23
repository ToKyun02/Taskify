import { axiosInstance } from '@/utils/network/axios';
import { safeResponse } from '@/utils/network/safeResponse';
import { LoginFormData, LoginResponse, loginResponseSchema, PutPasswordFormData } from '@/apis/auth/types';

/**
 * login
 * https://sp-taskify-api.vercel.app/docs/#/Auth/Login
 */
export const login = async (loginFormData: LoginFormData) => {
  const response = await axiosInstance.post<LoginResponse>('/auth/login', loginFormData);
  return safeResponse(response.data, loginResponseSchema);
};

/**
 * password 수정
 * https://sp-taskify-api.vercel.app/docs/#/Auth/ChangePassword
 */
export const putPassword = async (putPasswordFormData: PutPasswordFormData) => {
  await axiosInstance.put<void>('/auth/password', putPasswordFormData);
};
