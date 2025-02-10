import { z } from 'zod';

export const columnSchema = z.object({
  id: z.number(),
  title: z.string(),
  teamId: z.string(),
  dashboardId: z.number(),
  createdAt: z.union([z.string(), z.instanceof(URL)]),
  updatedAt: z.union([z.string(), z.instanceof(URL)]),
});

export type Column = z.infer<typeof columnSchema>;

export const columnsResponseSchema = z.object({
  result: z.string(),
  data: z.array(columnSchema),
});

export type ColumnsResponse = z.infer<typeof columnsResponseSchema>;

export const columnFormSchema = z.object({
  title: z.string(),
});

export type ColumnForm = z.infer<typeof columnFormSchema>;

export const cardImageFormSchema = z.object({
  image: z.instanceof(File),
});

export type CardImageForm = z.infer<typeof cardImageFormSchema>;

export const cardImageResponseSchema = z.object({
  imageUrl: z.union([z.string(), z.instanceof(URL)]),
});

export type cardImageResponse = z.infer<typeof cardImageResponseSchema>;
