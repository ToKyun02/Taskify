import axiosClientHelper from '@/utils/network/axiosClientHelper';
import { LoginFormData, LoginResponse, loginResponseSchema, PutPasswordFormData } from './types';
import { safeResponse } from '@/utils/network/safeResponse';

export const login = async (loginFormData: LoginFormData) => {
  const response = await axiosClientHelper.post<LoginResponse>('/auth/login', loginFormData);
  return safeResponse(response.data, loginResponseSchema);
};

export const putPassword = async (putPasswordFormData: PutPasswordFormData) => {
  await axiosClientHelper.put<void>('/auth/password', putPasswordFormData);
};

export const logout = async () => {
  await axiosClientHelper.post<void>('/auth/logout');
};
