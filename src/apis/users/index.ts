import axiosHelper from '@/utils/network/axiosHelper';
import { GetUserResponse, SignupFormData, SignupResponse } from './types';
import { isAxiosError } from 'axios';
import { isError } from 'es-toolkit/compat';

export const signup = async (signupFormData: SignupFormData): SignupResponse => {
  try {
    const response = await axiosHelper.post('/users', signupFormData);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) return error.response?.data;
    return {
      message: isError(error) ? error.message : String(error),
    };
  }
};

export const getUser = async (): GetUserResponse => {
  try {
    const response = await axiosHelper.get('/users/me');
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) return error.response?.data;
    return {
      message: isError(error) ? error.message : String(error),
    };
  }
};
