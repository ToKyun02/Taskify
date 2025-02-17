import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login, logout, putPassword } from '.';
import { LoginFormData, PutPasswordFormData } from './types';

export const useLogin = () => {
  return useMutation({
    mutationFn: (loginFormData: LoginFormData) => {
      return login(loginFormData);
    },
  });
};

export const usePutPassword = () => {
  return useMutation({
    mutationFn: (putPasswordFormData: PutPasswordFormData) => {
      return putPassword(putPasswordFormData);
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => {
      return logout();
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
};
