import isValidDate from '@/utils/isValidDate';
import { z } from 'zod';

const IMAGE_URL = 'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/taskify/task_image/';

const cardBaseSchema = z.object({
  dashboardId: z.number(),
  columnId: z.number(),
  title: z.string(),
  description: z.string(),
  dueDate: z.string().refine((date) => isValidDate(date), {
    message: '유효하지 않은 날짜 형식입니다.',
  }),
  tags: z.array(z.string()),
  imageUrl: z
    .string()
    .url()
    .refine((val) => val.startsWith(IMAGE_URL), {
      message: '올바르지 않은 이미지 경로입니다.',
    }),
});

export const cardSchema = cardBaseSchema.extend({
  id: z.number(),
  assignee: z.object({
    id: z.number(),
    nickname: z.string(),
    profileImageUrl: z.union([z.string(), z.null(), z.instanceof(URL)]),
  }),
  teamId: z.string(),
  createdAt: z.union([z.string(), z.date()]),
  updatedAt: z.union([z.string(), z.date()]),
});

export type Card = z.infer<typeof cardSchema>;

export const cardFormSchema = cardBaseSchema.extend({
  assigneeUserId: z.number(),
});

export type CardForm = z.infer<typeof cardFormSchema>;

export const cardsResponseSchema = z.object({
  cursorId: z.number().nullable(),
  totalCount: z.number(),
  cards: z.array(cardSchema),
});

export type CardsResponse = z.infer<typeof cardsResponseSchema>;

export const getCardsParamsSchema = z.object({
  cards: z.object({
    size: z.number().optional(),
    cursorId: z.number().optional(),
    columnId: z.number(),
  }),
});

export type GetCardsParams = z.infer<typeof getCardsParamsSchema>;

export const putCardFormSchema = cardFormSchema.extend({
  cardId: z.number(),
});

export type PutCardForm = z.infer<typeof putCardFormSchema>;
