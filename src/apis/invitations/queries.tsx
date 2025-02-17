'use client';

import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getMyInvitations, respondToInvitation } from '.';
import { GetMyInvitationsRequest, RespondToInvitationRequest } from './types';

export const useMyInvitationsQuery = (params: GetMyInvitationsRequest) => {
  return useInfiniteQuery({
    queryKey: ['myInvitations', params],
    queryFn: ({ pageParam }) =>
      getMyInvitations({
        ...params,
        cursorId: pageParam,
      }),
    getNextPageParam: (lastPage) => lastPage.cursorId || undefined,
    initialPageParam: 0,
  });
};

export const useRespondToInvitaion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: RespondToInvitationRequest) => {
      return respondToInvitation(params);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myInvitations'] });
      queryClient.invalidateQueries({ queryKey: ['dashboards'] });
    },
  });
};
