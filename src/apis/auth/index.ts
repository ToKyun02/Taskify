import axiosClientHelper from '@/utils/network/axiosClientHelper';
import { LoginFormData, LoginResponse, PutPasswordFormData, PutPasswordResponse } from './types';
import { isAxiosError } from 'axios';
import { isError } from 'es-toolkit/compat';

export const login = async (loginFormData: LoginFormData): LoginResponse => {
  try {
    const response = await axiosClientHelper.post('/auth/login', loginFormData);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) return error.response?.data;
    return { message: isError(error) ? error.message : String(error) };
  }
};

export const putPassword = async (putPasswordFormData: PutPasswordFormData): PutPasswordResponse => {
  await axiosClientHelper.put('/auth/password', putPasswordFormData);
};

export const logout = async () => {
  await axiosClientHelper.post('/auth/logout');
};
