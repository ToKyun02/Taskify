'use client';

import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteCard, getCard, getCards, moveCard, postCard, putCard } from '@/apis/cards';
import { Card, CardRequest, CardsResponse, GetCardsParams } from '@/apis/cards/types';
import { Column } from '@/apis/columns/types';

export const useCardsQuery = (params: GetCardsParams) => {
  return useInfiniteQuery({
    queryKey: ['cards', params.columnId],
    queryFn: ({ pageParam }) => getCards({ ...params, cursorId: pageParam }),
    getNextPageParam: (lastPage) => lastPage.cursorId || undefined,
    initialPageParam: 0,
  });
};

export const useCardQuery = (id: Card['id']) => {
  return useQuery({
    queryKey: ['card', id],
    queryFn: () => getCard(id),
  });
};

export const useCreateCard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (cardRequest: CardRequest) => {
      return postCard(cardRequest);
    },
    onSuccess: (card: Card) => {
      queryClient.invalidateQueries({ queryKey: ['cards', card.columnId] });
    },
  });
};

export const useUpdateCard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, cardRequest }: { id: Card['id']; cardRequest: CardRequest }) => {
      return putCard(id, cardRequest);
    },
    onSuccess: (card: Card) => {
      queryClient.invalidateQueries({ queryKey: ['cards'] });
      queryClient.invalidateQueries({ queryKey: ['card', card.id] });
    },
  });
};

export const useMoveCard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ cardId, columnId }: { cardId: Card['id']; columnId: Column['id']; prevId: Column['id'] }) => {
      return moveCard(cardId, columnId);
    },
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: ['cards', variables.prevId] });
      await queryClient.cancelQueries({ queryKey: ['cards', variables.columnId] });

      const prevSourceColumn = queryClient.getQueryData<{ pageParams: number[]; pages: CardsResponse[] }>(['cards', variables.prevId]);
      const prevDestinationColumn = queryClient.getQueryData<{ pageParams: number[]; pages: CardsResponse[] }>(['cards', variables.columnId]);

      return { prevSourceColumn, prevDestinationColumn };
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(['cards', variables.prevId], context?.prevSourceColumn);
      queryClient.setQueryData(['cards', variables.columnId], context?.prevDestinationColumn);
    },
    onSettled: (data, error, variables) => {
      queryClient.invalidateQueries({ queryKey: ['cards', variables.prevId] });
      queryClient.invalidateQueries({ queryKey: ['cards', variables.columnId] });
      queryClient.invalidateQueries({ queryKey: ['card', variables.cardId] });
    },
  });
};

export const useRemoveCard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: Card['id']) => {
      return deleteCard(id);
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['cards'] });
      queryClient.invalidateQueries({ queryKey: ['card', id] });
    },
  });
};
