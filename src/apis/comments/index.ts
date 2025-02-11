import axiosClientHelper from '@/utils/network/axiosClientHelper';
import { Comment, CommentForm, commentSchema, CommentsResponse, commentsResponseSchema, GetCommentsParams, PutCommentForm } from './types';

const RESPONSE_INVALID_MESSAGE = '서버에서 받은 데이터가 예상과 다릅니다';

export const postComment = async (commentForm: CommentForm) => {
  const response = await axiosClientHelper.post<Comment>('/comments', commentForm);
  const result = commentSchema.safeParse(response.data);
  if (!result.success) throw new Error(RESPONSE_INVALID_MESSAGE);
  return result.data;
};

export const getComments = async (params: GetCommentsParams) => {
  const response = await axiosClientHelper.get<CommentsResponse>('/comments', { params });
  const result = commentsResponseSchema.safeParse(response.data);
  if (!result.success) throw new Error(RESPONSE_INVALID_MESSAGE);
  return result.data;
};

export const putComment = async (commentId: number, putCommentForm: PutCommentForm) => {
  const response = await axiosClientHelper.put<Comment>(`/comments/${commentId}`, putCommentForm);
  const result = commentSchema.safeParse(response.data);
  if (!result.success) throw new Error(RESPONSE_INVALID_MESSAGE);
  return result.data;
};

export const deleteComment = async (commentId: number) => {
  await axiosClientHelper.delete<void>(`/comments/${commentId}`);
};
