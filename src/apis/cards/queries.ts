'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteCard, getCard, getCards, postCard, putCard } from '.';
import { Card, CardForm, GetCardsParams } from './types';

export const useCardsQuery = (params: GetCardsParams) => {
  return useQuery({
    queryKey: ['cards', params.columnId],
    queryFn: () => getCards(params),
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
    mutationFn: (formData: CardForm) => {
      return postCard(formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cards'] });
    },
  });
};

export const useUpdateCard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, formData }: { id: Card['id']; formData: CardForm }) => {
      return putCard(id, formData);
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cards'] });
    },
  });
};
