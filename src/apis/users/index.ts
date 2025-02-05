import axiosHelper from '@/utils/network/axiosHelper';
import { SignupFormData } from './types';
import isResponseSuccess from '@/utils/network/isResponseSuccess';
import { isAxiosError } from 'axios';
import { SignupResponse } from './types';
import { isError } from 'es-toolkit/compat';

export const signup = async (signupFormData: SignupFormData): SignupResponse => {
  try {
    const response = await axiosHelper.post('/users', signupFormData);
    if (!isResponseSuccess(response.status)) throw new Error(`${response.status} ${response.statusText}`);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) return error.response?.data;

    return {
      message: isError(error) ? error.message : String(error),
    };
  }
};
