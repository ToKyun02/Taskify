import axiosClientHelper from '@/utils/network/axiosClientHelper';
import { CreateProfileImageForm, ProfileImageUrlResponse, profileImageUrlResponseSchema, SignupFormData, SignupResponse, UpdateUserForm, User, userSchema } from './types';
import { safeResponse } from '@/utils/network/safeResponse';

export const signup = async (signupFormData: SignupFormData) => {
  const response = await axiosClientHelper.post<SignupResponse>('/users', signupFormData);
  return safeResponse(response.data, userSchema);
};

export const getUser = async () => {
  const response = await axiosClientHelper.get<User>('/users/me');
  return safeResponse(response.data, userSchema);
};

export const updateUser = async (updateUserForm: UpdateUserForm) => {
  const response = await axiosClientHelper.put<User>('/users/me', updateUserForm);
  return safeResponse(response.data, userSchema);
};

export const createProfileImage = async (createProfileImageForm: CreateProfileImageForm) => {
  const response = await axiosClientHelper.post<ProfileImageUrlResponse>('/users/me/image', createProfileImageForm, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return safeResponse(response.data, profileImageUrlResponseSchema);
};
