import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getComments, postComment, putComment, deleteComment } from '.';
import type { CommentForm, GetCommentsParams, PutCommentForm } from '@/apis/comments/types';

export const useCommentsQuery = (params: GetCommentsParams) => {
  return useInfiniteQuery({
    queryKey: ['comments', params.cardId],
    queryFn: ({ pageParam = undefined }) => getComments({ ...params, cursorId: pageParam }),
    getNextPageParam: (lastPage) => lastPage.cursorId ?? undefined,
    initialPageParam: 0,
  });
};

export const usePostComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: CommentForm) => postComment(formData),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['comments', variables.cardId] });
    },
  });
};

export const useUpdateComment = (cardId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, putCommentForm }: { id: number; putCommentForm: PutCommentForm }) => putComment(id, putCommentForm),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', cardId] });
    },
  });
};

export const useDeleteComment = (cardId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteComment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', cardId] });
    },
  });
};
