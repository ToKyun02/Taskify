import isValidDate from '@/utils/isValidDate';
import { z } from 'zod';

const IMAGE_URL = 'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/taskify/task_image/';

const taskBaseSchema = z.object({
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

export const taskSchema = taskBaseSchema.extend({
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

export type Task = z.infer<typeof taskSchema>;

export const taskFormSchema = taskBaseSchema.extend({
  assigneeUserId: z.number(),
});

export type TaskForm = z.infer<typeof taskFormSchema>;

export const tasksResponseSchema = z.object({
  cursorId: z.number().nullable(),
  totalCount: z.number(),
  cards: z.array(taskSchema),
});

export type TasksResponse = z.infer<typeof tasksResponseSchema>;

export const getTasksParamsSchema = z.object({
  cards: z.object({
    size: z.number().optional(),
    cursorId: z.number().optional(),
    columnId: z.number(),
  }),
});

export type TasksParams = z.infer<typeof getTasksParamsSchema>;
