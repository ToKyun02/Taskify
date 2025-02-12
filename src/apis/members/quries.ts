import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteMember, getMembers } from '.';
import { DeleteMemberRequest, GetMembersRequest } from './types';

export const useMembersQuery = (params: GetMembersRequest) => {
  return useQuery({
    queryKey: ['members', params.dashboardId],
    queryFn: () => getMembers(params),
  });
};

export const useRemoveMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: DeleteMemberRequest) => {
      return deleteMember(params);
    },
    onSuccess: (_, { dashboardId }) => {
      queryClient.invalidateQueries({ queryKey: ['members', dashboardId] });
    },
  });
};
