import axiosClientHelper from '@/utils/network/axiosClientHelper';
import { Card, CardForm, cardSchema, CardsResponse, cardsResponseSchema, GetCardsParams } from './types';

const RESPONSE_INVALID_MESSAGE = '서버에서 받은 데이터가 예상과 다릅니다';

export const postCard = async (cardForm: CardForm) => {
  const response = await axiosClientHelper.post<Card>('/cards', cardForm);
  const result = cardSchema.safeParse(response.data);
  if (!result.success) throw new Error(RESPONSE_INVALID_MESSAGE);
  return result.data;
};

export const getCards = async (params: GetCardsParams) => {
  const response = await axiosClientHelper.get<CardsResponse>('/cards', { params });
  const result = cardsResponseSchema.safeParse(response.data);
  if (!result.success) throw new Error(RESPONSE_INVALID_MESSAGE);
  return result.data;
};

export const putCard = async (cardId: number, cardForm: CardForm) => {
  const response = await axiosClientHelper.put<Card>(`/cards/${cardId}`, cardForm);
  const result = cardSchema.safeParse(response.data);
  if (!result.success) throw new Error(RESPONSE_INVALID_MESSAGE);
  return result.data;
};

export const getCard = async (cardId: number) => {
  const response = await axiosClientHelper.get<Card>(`/cards/${cardId}`);
  const result = cardSchema.safeParse(response.data);
  if (!result.success) throw new Error(RESPONSE_INVALID_MESSAGE);
  return result.data;
};

export const deleteCard = async (cardId: number) => {
  await axiosClientHelper.delete<void>(`/cards/${cardId}`);
};
