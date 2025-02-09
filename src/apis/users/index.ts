import axiosClientHelper from '@/utils/network/axiosClientHelper';
import { CreateProfileImageForm, CreateProfileImageSuccessResponse, GetUserResponse, SignupFormData, SignupResponse, UpdateUserForm, User } from './types';
import { isAxiosError } from 'axios';
import { isError } from 'es-toolkit/compat';

export const signup = async (signupFormData: SignupFormData): SignupResponse => {
  try {
    const response = await axiosClientHelper.post('/api/users', signupFormData);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) return error.response?.data;
    return {
      message: isError(error) ? error.message : String(error),
    };
  }
};

export const getUser = async (): GetUserResponse => {
  const response = await axiosClientHelper.get('/api/users/me');
  return response.data;
};

export const updateUser = async (updateUserForm: UpdateUserForm) => {
  const response = await axiosClientHelper.put<User>('/api/users/me', updateUserForm);
  return response.data;
};

export const createProfileImage = async (createProfileImageForm: CreateProfileImageForm) => {
  const response = await axiosClientHelper.post<CreateProfileImageSuccessResponse>('/api/users/me/image', createProfileImageForm, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
