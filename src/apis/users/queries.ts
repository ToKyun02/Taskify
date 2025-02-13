import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getUser, updateUser } from '.';
import { UpdateUserForm } from './types';

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
