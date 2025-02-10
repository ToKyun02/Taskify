import axiosClientHelper from '@/utils/network/axiosClientHelper';
import { CardImageForm, CardImageResponse, cardImageResponseSchema, Column, ColumnForm, columnSchema, ColumnsResponse, columnsResponseSchema, GetColumnsParams } from './types';

const RESPONSE_INVALID_MESSAGE = '서버에서 받은 데이터가 예상과 다릅니다';

export const postColumn = async (dashboardId: number, columnForm: ColumnForm) => {
  const response = await axiosClientHelper.post<Column>('/columns', {
    ...columnForm,
    dashboardId,
  });
  const result = columnSchema.safeParse(response.data);
  if (!result.success) throw new Error(RESPONSE_INVALID_MESSAGE);
  return result.data;
};

export const getColumns = async (params: GetColumnsParams) => {
  const response = await axiosClientHelper.get<ColumnsResponse>('/columns', {
    params,
  });

  const result = columnsResponseSchema.safeParse(response.data);
  if (!result.success) throw new Error(RESPONSE_INVALID_MESSAGE);
  return result.data;
};

export const putColumn = async (columnId: number, columnForm: ColumnForm) => {
  const response = await axiosClientHelper.put<Column>(`/columns/${columnId}`, columnForm);
  const result = columnSchema.safeParse(response.data);
  if (!result.success) throw new Error(RESPONSE_INVALID_MESSAGE);
  return result.data;
};

export const deleteColumn = async (columnId: number) => {
  await axiosClientHelper.delete<void>(`/columns/${columnId}`);
};

export const postCardImage = async (columnId: number, cardImageForm: CardImageForm) => {
  const response = await axiosClientHelper.post<CardImageResponse>(`/columns/${columnId}/card-image`, cardImageForm, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  const result = cardImageResponseSchema.safeParse(response.data);
  if (!result.success) throw new Error(RESPONSE_INVALID_MESSAGE);
  return result.data;
};
