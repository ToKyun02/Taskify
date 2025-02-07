import { useInfiniteQuery, QueryFunctionContext } from '@tanstack/react-query';
import mockData from '@/apis/invitations/mockData';
import { InvitationsResponse } from '@/apis/invitations/types';

const PAGE_SIZE = 5;

async function fetchInvitations({ pageParam = 0 }: { pageParam?: number }): Promise<InvitationsResponse> {
  const start = pageParam * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const pageData = mockData.invitations.slice(start, end);
  return {
    invitations: pageData,
    nextPage: end < mockData.invitations.length ? pageParam + 1 : undefined,
  };
}

export function useInfiniteInvitations() {
  return useInfiniteQuery<InvitationsResponse, Error>({
    queryKey: ['invitations'],
    queryFn: ({ pageParam = 0 }: QueryFunctionContext) => fetchInvitations({ pageParam: pageParam as number }),
    getNextPageParam: (lastPage: InvitationsResponse) => lastPage.nextPage,
    initialPageParam: 0,
  });
}
