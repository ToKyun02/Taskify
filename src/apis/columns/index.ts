import axiosClientHelper from '@/utils/network/axiosClientHelper';
import { CardImageForm, CardImageResponse, cardImageResponseSchema, Column, ColumnForm, columnSchema, ColumnsResponse, columnsResponseSchema, GetColumnsParams } from './types';
import { safeResponse } from '@/utils/network/safeResponse';

/**
 * column 생성
 * https://sp-taskify-api.vercel.app/docs/#/Columns/Create
 */
export const postColumn = async (dashboardId: number, columnForm: ColumnForm) => {
  const response = await axiosClientHelper.post<Column>('/columns', {
    ...columnForm,
    dashboardId,
  });
  return safeResponse(response.data, columnSchema);
};

/**
 * columns 목록 조회
 * https://sp-taskify-api.vercel.app/docs/#/Columns/Find
 */
export const getColumns = async (params: GetColumnsParams) => {
  const response = await axiosClientHelper.get<ColumnsResponse>('/columns', {
    params,
  });
  return safeResponse(response.data, columnsResponseSchema);
};

/**
 * column 수정
 * https://sp-taskify-api.vercel.app/docs/#/Columns/Update
 */
export const putColumn = async (columnId: number, columnForm: ColumnForm) => {
  const response = await axiosClientHelper.put<Column>(`/columns/${columnId}`, columnForm);
  return safeResponse(response.data, columnSchema);
};

/**
 * column 삭제
 * https://sp-taskify-api.vercel.app/docs/#/Columns/Delete
 */
export const deleteColumn = async (columnId: number) => {
  await axiosClientHelper.delete<void>(`/columns/${columnId}`);
};

/**
 * card image 생성
 * https://sp-taskify-api.vercel.app/docs/#/Columns/UploadImage
 */
export const postCardImage = async (columnId: number, cardImageForm: CardImageForm) => {
  const response = await axiosClientHelper.post<CardImageResponse>(`/columns/${columnId}/card-image`, cardImageForm, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return safeResponse(response.data, cardImageResponseSchema);
};
