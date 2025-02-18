import { z } from 'zod';
import isValidDate from '@/utils/isValidDate';

const IMAGE_URL = 'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/taskify/task_image/';

const cardBaseSchema = z.object({
  dashboardId: z.number(),
  columnId: z.number(),
  title: z.string().trim(),
  description: z.string().trim(),
  dueDate: z.union([z.string(), z.instanceof(Date)]).refine((date) => isValidDate(date), {
    message: '유효하지 않은 날짜 형식입니다.',
  }),
  tags: z.array(z.string().trim()),
  imageUrl: z.string().url(),
});

export const cardSchema = cardBaseSchema.extend({
  id: z.number(),
  assignee: z.object({
    id: z.number(),
    nickname: z.string(),
    profileImageUrl: z.union([z.string(), z.null()]),
  }),
  teamId: z.string(),
  createdAt: z.union([z.string(), z.date()]),
  updatedAt: z.union([z.string(), z.date()]),
});

export type Card = z.infer<typeof cardSchema>;

export const cardFormSchema = cardBaseSchema.extend({
  dueDate: z.date({ message: '날짜를 입력해 주세요' }).refine((date) => isValidDate(date), { message: '유효하지 않은 날짜 형식입니다.' }),
  assigneeUserId: z.number().refine((id) => id, { message: '담당자를 지정해 주세요' }),
  imageUrl: z
    .instanceof(File)
    .refine((file) => ['image/jpeg', 'image/jpg', 'image/png', 'image/x-icon'].includes(file.type), {
      message: '이미지는 jpeg, jpg, png, ico 형식만 허용됩니다.',
    })
    .refine((file) => file.size < 5 * 1024 * 1024, { message: '5MB이하인 이미지만 등록 가능합니다.' })
    .optional(),
});

export type CardForm = z.infer<typeof cardFormSchema>;

export const cardRequestSchema = cardFormSchema.extend({
  dueDate: z.string(),
  imageUrl: z.string().refine((src) => src.startsWith(IMAGE_URL), {
    message: '올바르지 않은 이미지 경로입니다.',
  }),
});

export type CardRequest = z.infer<typeof cardRequestSchema>;

export const cardsResponseSchema = z.object({
  cursorId: z.number().nullable(),
  totalCount: z.number(),
  cards: z.array(cardSchema),
});

export type CardsResponse = z.infer<typeof cardsResponseSchema>;

export const getCardsParamsSchema = z.object({
  size: z.number().optional(),
  cursorId: z.number().optional(),
  columnId: z.number(),
});

export type GetCardsParams = z.infer<typeof getCardsParamsSchema>;
