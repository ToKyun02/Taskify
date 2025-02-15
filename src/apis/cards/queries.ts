'use client';

import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteCard, getCard, getCards, postCard, putCard } from '.';
import { Card, CardRequest, GetCardsParams } from './types';

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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cards'] });
    },
  });
};

export const useUpdateCard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, cardRequest }: { id: Card['id']; cardRequest: CardRequest }) => {
      return putCard(id, cardRequest);
    },
    onSuccess: ({ id }: { id: Card['id'] }) => {
      queryClient.invalidateQueries({ queryKey: ['cards'] });
      queryClient.invalidateQueries({ queryKey: ['card', id] });
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
