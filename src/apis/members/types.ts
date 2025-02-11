import { z } from 'zod';
import { userSchema } from '../users/types';
import { BasePaginationParams } from '../dashboards/types';

export type MembersParams = BasePaginationParams & {
  dashboardId: number;
};

export const memberSchema = userSchema.extend({
  userId: z.number(),
  isOwner: z.boolean(),
});
export type Member = z.infer<typeof memberSchema>;

export const membersResponseSchema = z.object({
  totalCount: z.number(),
  members: z.array(memberSchema),
});

export type MembersRespons = z.infer<typeof membersResponseSchema>;
