import { z } from 'zod';
import { User, userSchema } from '@/apis//users/types';
import { Dashboard } from '@/apis/dashboards/types';
import { BasePagination } from '@/types/common';

export type GetMembersRequest = BasePagination & {
  dashboardId: Dashboard['id'];
};

export const memberSchema = userSchema.extend({
  userId: z.number(),
  isOwner: z.boolean(),
});
export const membersSchema = z.object({
  totalCount: z.number(),
  members: z.array(memberSchema),
});

export type Member = z.infer<typeof memberSchema>;
export type Members = z.infer<typeof membersSchema>;

export type DeleteMemberRequest = {
  dashboardId: Dashboard['id'];
  memberId: User['id'];
};
