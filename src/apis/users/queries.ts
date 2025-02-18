import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createProfileImage, getUser, signup, updateUser } from '@/apis/users';
import { CreateProfileImageForm, SignupFormData, UpdateUserForm } from '@/apis/users/types';

export const useGetUser = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: () => getUser(),
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: UpdateUserForm) => {
      return updateUser(params);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};

export const useSignup = () => {
  return useMutation({
    mutationFn: (signupFormData: SignupFormData) => {
      return signup(signupFormData);
    },
  });
};

export const useCreateProfileImage = () => {
  return useMutation({
    mutationFn: (createProfileImageForm: CreateProfileImageForm) => {
      return createProfileImage(createProfileImageForm);
    },
  });
};
