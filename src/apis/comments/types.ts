import { z } from 'zod';

export const commentSchema = z.object({
  id: z.number(),
  content: z.string(),
  createdAt: z.union([z.string(), z.date()]),
  updatedAt: z.union([z.string(), z.date()]),
  cardId: z.number(),
  author: z.object({
    id: z.number(),
    nickname: z.string(),
    profileImageUrl: z.union([z.null(), z.string(), z.instanceof(URL)]),
  }),
});

export type Comment = z.infer<typeof commentSchema>;

export const commentFormSchema = z.object({
  content: z.string().trim(),
  cardId: z.number(),
  columnId: z.number(),
  dashboardId: z.number(),
});

export type CommentForm = z.infer<typeof commentFormSchema>;

export const getCommentsParamsSchema = z.object({
  cursorId: z.number().optional(),
  size: z.number().optional(),
  cardId: z.number(),
});

export type GetCommentsParams = z.infer<typeof getCommentsParamsSchema>;

export const commentsResponseSchema = z.object({
  cursorId: z.number().nullable(),
  comments: z.array(commentSchema),
});

export type CommentsResponse = z.infer<typeof commentsResponseSchema>;

export const putCommentFormSchema = z.object({
  content: z.string(),
});

export type PutCommentForm = z.infer<typeof putCommentFormSchema>;
