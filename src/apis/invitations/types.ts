import { z } from 'zod';
import { dashboardInvitationSchema } from '../dashboards/types';

export type BaseCursorParams = {
  cursorId?: number;
  size?: number;
};

export type MyInvitationsParams = BaseCursorParams & {
  title: string;
};

export const myInvitationsResponseSchema = z.object({
  cursorId: z.number().nullable(),
  invitations: z.array(dashboardInvitationSchema),
});
export type MyInvitationsResponse = z.infer<typeof myInvitationsResponseSchema>;

export const respondToInvitationSchema = z.object({
  inviteAccepted: z.boolean(),
});
export type RespondToInvitation = z.infer<typeof respondToInvitationSchema>;
