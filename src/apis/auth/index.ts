import axiosClientHelper from '@/utils/network/axiosClientHelper';
import { safeResponse } from '@/utils/network/safeResponse';
import { LoginFormData, LoginResponse, loginResponseSchema, PutPasswordFormData } from '@/apis/auth/types';

/**
 * login
 * https://sp-taskify-api.vercel.app/docs/#/Auth/Login
 */
export const login = async (loginFormData: LoginFormData) => {
  const response = await axiosClientHelper.post<LoginResponse>('/auth/login', loginFormData);
  return safeResponse(response.data, loginResponseSchema);
};

export const logout = async () => {
  await axiosClientHelper.post<void>('/auth/logout');
};

/**
 * password 수정
 * https://sp-taskify-api.vercel.app/docs/#/Auth/ChangePassword
 */
export const putPassword = async (putPasswordFormData: PutPasswordFormData) => {
  await axiosClientHelper.put<void>('/auth/password', putPasswordFormData);
};
