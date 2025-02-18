import { z } from 'zod';
import { DashboardInvitation, dashboardInvitationSchema } from '@/apis/dashboards/types';
import { BaseCursor } from '@/types/common';

export type GetMyInvitationsRequest = Partial<BaseCursor> & {
  title: string;
};

export const myInvitationsSchema = z.object({
  cursorId: z.number().nullable(),
  invitations: z.array(dashboardInvitationSchema),
});
export type MyInvitations = z.infer<typeof myInvitationsSchema>;

export const respondToInvitationSchema = z.object({
  inviteAccepted: z.boolean(),
});
export type RespondToInvitation = z.infer<typeof respondToInvitationSchema>;
export type RespondToInvitationRequest = RespondToInvitation & { invitationId: DashboardInvitation['id'] };
