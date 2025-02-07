import axiosHelper from '@/utils/network/axiosHelper';
import { LoginFormData, LoginResponse, PutPasswordFormData, PutPasswordResponse } from './types';
import { isAxiosError } from 'axios';
import { isError } from 'es-toolkit/compat';

export const login = async (loginFormData: LoginFormData): LoginResponse => {
  try {
    const response = await axiosHelper.post('/auth/login', loginFormData);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) return error.response?.data;
    return { message: isError(error) ? error.message : String(error) };
  }
};

export const putPassword = async (putPasswordFormData: PutPasswordFormData): PutPasswordResponse => {
  await axiosHelper.put('/auth/password', putPasswordFormData);
};
