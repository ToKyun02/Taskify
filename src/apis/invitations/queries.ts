'use client';

import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getMyInvitations, RespondToInvitation } from '.';

export const useMyInvitationsQuery = (size: number, title: string) => {
  return useInfiniteQuery({
    queryKey: ['myInvitations', size, title],
    queryFn: ({ pageParam }) =>
      getMyInvitations({
        cursorId: pageParam,
        size,
        title,
      }),
    getNextPageParam: (lastPage) => lastPage.cursorId || undefined,
    initialPageParam: 0,
  });
};

export const useInvitationMutation = () => {
  const queryClient = useQueryClient();

  const accept = useMutation({
    mutationFn: ({ id, flag }: { id: number; flag: boolean }) => {
      return RespondToInvitation(id, { inviteAccepted: flag });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myInvitations'] });
      queryClient.invalidateQueries({ queryKey: ['dashboards'] });
    },
  });

  return {
    accept: accept.mutateAsync,
  };
};
