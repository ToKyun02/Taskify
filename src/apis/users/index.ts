import { axiosInstance } from '@/utils/network/axios';
import { safeResponse } from '@/utils/network/safeResponse';
import { CreateProfileImageForm, ProfileImageUrlResponse, profileImageUrlResponseSchema, SignupFormData, SignupResponse, UpdateUserForm, User, userSchema } from '@/apis/users/types';

/**
 * signup
 * https://sp-taskify-api.vercel.app/docs/#/Users/Create
 */
export const signup = async (signupFormData: SignupFormData) => {
  const response = await axiosInstance.post<SignupResponse>('/users', signupFormData);
  return safeResponse(response.data, userSchema);
};

/**
 * 내 정보 조회
 * https://sp-taskify-api.vercel.app/docs/#/Users/GetMyInfo
 */
export const getUser = async () => {
  const response = await axiosInstance.get<User>('/users/me');
  return safeResponse(response.data, userSchema);
};

/**
 * 내 정보 수정
 * https://sp-taskify-api.vercel.app/docs/#/Users/UpdateMyInfo
 */
export const updateUser = async (updateUserForm: UpdateUserForm) => {
  const response = await axiosInstance.put<User>('/users/me', updateUserForm);
  return safeResponse(response.data, userSchema);
};

/**
 * 프로필 이미지 업로드
 * https://sp-taskify-api.vercel.app/docs/#/Users/UploadProfileImage
 */
export const createProfileImage = async (createProfileImageForm: CreateProfileImageForm) => {
  const response = await axiosInstance.post<ProfileImageUrlResponse>('/users/me/image', createProfileImageForm, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return safeResponse(response.data, profileImageUrlResponseSchema);
};
