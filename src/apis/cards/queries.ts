'use client';

import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteCard, getCard, getCards, moveCard, postCard, putCard } from '.';
import { Card, CardRequest, CardsResponse, GetCardsParams } from './types';
import { Column } from '../columns/types';

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

      queryClient.setQueryData(['cards', variables.prevId], (data: { pageParams: number[]; pages: CardsResponse[] }) => {
        const updatedPages = data.pages.map((page) => {
          return {
            ...page,
            cards: page.cards.filter((card: Card) => card.id !== variables.cardId),
          };
        });
        return { ...data, pages: updatedPages };
      });

      queryClient.setQueryData(['cards', variables.columnId], (data: { pageParams: number[]; pages: CardsResponse[] }) => {
        const updatedPages = data.pages.map((page) => {
          const prevCards = prevSourceColumn?.pages.flatMap((page) => page.cards);
          const cardToMove = prevCards?.find((card) => {
            return card.id === variables.cardId;
          });
          if (cardToMove) {
            return {
              ...page,
              cards: [cardToMove, ...page.cards].sort((a, b) => {
                const dateA = new Date(a.createdAt);
                const dateB = new Date(b.createdAt);
                return dateA.getTime() - dateB.getTime();
              }),
            };
          }
          return page;
        });
        return { ...data, pages: updatedPages };
      });

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
