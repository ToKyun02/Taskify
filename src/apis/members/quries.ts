import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteMember, getMembers } from '.';

export const useMembersQuery = (page: number, size: number, dashboardId: number) => {
  return useQuery({
    queryKey: ['members', dashboardId, page, size],
    queryFn: () =>
      getMembers({
        page,
        size,
        dashboardId,
      }),
  });
};

export const useMembersMutation = () => {
  const queryClient = useQueryClient();

  const remove = useMutation({
    mutationFn: ({ memberId }: { memberId: number; dashboardId: number }) => {
      return deleteMember(memberId);
    },
    onSuccess: (_, { dashboardId }) => {
      queryClient.invalidateQueries({ queryKey: ['members', dashboardId] });
    },
  });

  return {
    remove: remove.mutateAsync,
  };
};
