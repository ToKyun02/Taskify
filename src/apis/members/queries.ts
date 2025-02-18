import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteMember, getMembers } from '@/apis/members/';
import { DeleteMemberRequest, GetMembersRequest } from '@/apis/members/types';

export const useMembersQuery = (params: GetMembersRequest) => {
  return useQuery({
    queryKey: ['members', params],
    queryFn: () => getMembers(params),
  });
};

export const useRemoveMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: DeleteMemberRequest) => {
      return deleteMember(params);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['members'] });
    },
  });
};
