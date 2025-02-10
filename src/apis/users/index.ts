import axiosClientHelper from '@/utils/network/axiosClientHelper';
import { CreateProfileImageForm, ProfileImageUrlResponse, profileImageUrlResponseSchema, SignupFormData, SignupResponse, UpdateUserForm, User, userSchema } from './types';
import { isAxiosError } from 'axios';
import { isError } from 'es-toolkit/compat';

export const signup = async (signupFormData: SignupFormData): SignupResponse => {
  try {
    const response = await axiosClientHelper.post('/users', signupFormData);
    const result = userSchema.safeParse(response.data);
    if (!result.success) throw new Error('서버에서 받은 데이터가 예상과 다릅니다.');
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) return error.response?.data;
    return {
      message: isError(error) ? error.message : String(error),
    };
  }
};

export const getUser = async () => {
  const response = await axiosClientHelper.get<User>('/users/me');
  const result = userSchema.safeParse(response.data);
  if (!result.success) throw new Error('서버에서 받은 데이터가 예상과 다릅니다.');
  return response.data;
};

export const updateUser = async (updateUserForm: UpdateUserForm) => {
  const response = await axiosClientHelper.put<User>('/users/me', updateUserForm);
  const result = userSchema.safeParse(response.data);
  if (!result.success) throw new Error('서버에서 받은 데이터가 예상과 다릅니다.');
  return response.data;
};

export const createProfileImage = async (createProfileImageForm: CreateProfileImageForm) => {
  const response = await axiosClientHelper.post<ProfileImageUrlResponse>('/users/me/image', createProfileImageForm, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  const result = profileImageUrlResponseSchema.safeParse(response.data);
  if (!result.success) throw new Error('서버에서 받은 데이터가 예상과 다릅니다.');
  return response.data;
};
