import axiosClientHelper from '@/utils/network/axiosClientHelper';
import { safeResponse } from '@/utils/network/safeResponse';
import { Card, CardRequest, cardSchema, CardsResponse, cardsResponseSchema, GetCardsParams } from '@/apis/cards/types';
import { Column } from '@/apis/columns/types';

/**
 * card 생성
 * https://sp-taskify-api.vercel.app/docs/#/Cards/Create
 */
export const postCard = async (cardRequest: CardRequest) => {
  const response = await axiosClientHelper.post<Card>('/cards', cardRequest);
  return safeResponse(response.data, cardSchema);
};

/**
 * cards 목록 조회
 * https://sp-taskify-api.vercel.app/docs/#/Cards/Find
 */
export const getCards = async (params: GetCardsParams) => {
  const { cursorId, size, columnId } = params;
  const response = await axiosClientHelper.get<CardsResponse>('/cards', {
    params: {
      size,
      columnId,
      ...(cursorId && { cursorId }),
    },
  });
  return safeResponse(response.data, cardsResponseSchema);
};

/**
 * card 상세 조회
 * https://sp-taskify-api.vercel.app/docs/#/Cards/Get
 */
export const getCard = async (cardId: number) => {
  const response = await axiosClientHelper.get<Card>(`/cards/${cardId}`);
  return safeResponse(response.data, cardSchema);
};

/**
 * card 수정
 * https://sp-taskify-api.vercel.app/docs/#/Cards/Update
 */
export const putCard = async (cardId: number, cardRequest: CardRequest) => {
  const response = await axiosClientHelper.put<Card>(`/cards/${cardId}`, cardRequest);
  return safeResponse(response.data, cardSchema);
};

/**
 * card 드래그 이동
 * https://sp-taskify-api.vercel.app/docs/#/Cards/Update
 */
export const moveCard = async (cardId: Card['id'], columnId: Column['id']) => {
  const response = await axiosClientHelper.put<Card>(`/cards/${cardId}`, { columnId });
  return safeResponse(response.data, cardSchema);
};

/**
 * card 삭제
 * https://sp-taskify-api.vercel.app/docs/#/Cards/Delete
 */
export const deleteCard = async (cardId: number) => {
  await axiosClientHelper.delete<void>(`/cards/${cardId}`);
};
