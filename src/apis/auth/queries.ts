import { useMutation } from '@tanstack/react-query';
import { putPassword } from '@/apis/auth';
import { PutPasswordFormData } from '@/apis/auth/types';

export const usePutPassword = () => {
  return useMutation({
    mutationFn: (putPasswordFormData: PutPasswordFormData) => {
      return putPassword(putPasswordFormData);
    },
  });
};
