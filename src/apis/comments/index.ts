import axiosClientHelper from '@/utils/network/axiosClientHelper';
import { Comment, CommentForm, commentSchema, CommentsResponse, commentsResponseSchema, GetCommentsParams, PutCommentForm } from './types';
import { safeResponse } from '@/utils/network/safeResponse';

/**
 * comment 생성
 * https://sp-taskify-api.vercel.app/docs/#/Comments/Create
 */
export const postComment = async (commentForm: CommentForm) => {
  const response = await axiosClientHelper.post<Comment>('/comments', commentForm);
  return safeResponse(response.data, commentSchema);
};

/**
 * comments 목록 조회
 * https://sp-taskify-api.vercel.app/docs/#/Columns/Find
 */
export const getComments = async (params: GetCommentsParams) => {
  const response = await axiosClientHelper.get<CommentsResponse>('/comments', { params });
  return safeResponse(response.data, commentsResponseSchema);
};

/**
 * comment 수정
 * https://sp-taskify-api.vercel.app/docs/#/Columns/Update
 */
export const putComment = async (commentId: number, putCommentForm: PutCommentForm) => {
  const response = await axiosClientHelper.put<Comment>(`/comments/${commentId}`, putCommentForm);
  return safeResponse(response.data, commentsResponseSchema);
};

/**
 * comment 삭제
 * https://sp-taskify-api.vercel.app/docs/#/Columns/Delete
 */
export const deleteComment = async (commentId: number) => {
  await axiosClientHelper.delete<void>(`/comments/${commentId}`);
};
