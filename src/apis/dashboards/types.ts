import { z } from 'zod';
import { userSchema } from '@/apis/users/types';
import { DASHBOARD_FORM_ERROR_MESSAGE, DASHBOARD_FORM_VALID_LENGTH } from '@/constants/dashboard';
import { DEFAULT_COLORS } from '@/constants/colors';
import { BasePagination, NavigationMethod } from '@/types/common';

export const dashboardSchema = z.object({
  id: z.number(),
  title: z.string(),
  color: z.enum(DEFAULT_COLORS).catch(DEFAULT_COLORS[0]),
  createdAt: z.string(),
  updatedAt: z.string(),
  createdByMe: z.boolean(),
  userId: z.number(),
});

export const dashboardsSchema = z.object({
  cursorId: z.number().nullable(),
  totalCount: z.number(),
  dashboards: z.array(dashboardSchema),
});

export type Dashboard = z.infer<typeof dashboardSchema>;
export type Dashboards = z.infer<typeof dashboardsSchema>;
export type GetDashboardsRequest = Partial<BasePagination> & {
  cursorId?: number;
  navigationMethod: NavigationMethod;
};

export const dashboardFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(DASHBOARD_FORM_VALID_LENGTH.TITLE.MIN, { message: DASHBOARD_FORM_ERROR_MESSAGE.TITLE.MIN })
    .max(DASHBOARD_FORM_VALID_LENGTH.TITLE.MAX, { message: DASHBOARD_FORM_ERROR_MESSAGE.TITLE.MAX }),
  color: z.enum(DEFAULT_COLORS),
});
export type DashboardFormType = z.infer<typeof dashboardFormSchema>;
export type CreateDashboardRequest = DashboardFormType;
export type UpdateDashboardRequest = Partial<DashboardFormType> & {
  id: Dashboard['id'];
};

export const invitationUserSchema = userSchema.pick({
  id: true,
  email: true,
  nickname: true,
});
export const dashboardInvitationSchema = z.object({
  id: z.number(),
  inviter: invitationUserSchema,
  invitee: invitationUserSchema,
  teamId: z.string(),
  dashboard: dashboardSchema.pick({ id: true, title: true }),
  inviteAccepted: z.boolean().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export const dashboardInvitationsSchema = z.object({
  totalCount: z.number(),
  invitations: z.array(dashboardInvitationSchema),
});

export type DashboardInvitation = z.infer<typeof dashboardInvitationSchema>;
export type DashboardInvitations = z.infer<typeof dashboardInvitationsSchema>;
export type GetDashboardInvitationsRequest = Partial<BasePagination> & {
  id: Dashboard['id'];
};

export const inviteDashboardFormSchema = z.object({
  email: z.string().email({ message: DASHBOARD_FORM_ERROR_MESSAGE.EMAIL.INVALID }),
});
export type InviteDashboardFormType = z.infer<typeof inviteDashboardFormSchema>;
export type InviteDashboardRequest = InviteDashboardFormType & { id: Dashboard['id'] };
export type CancelInviteDashboardRequest = {
  id: Dashboard['id'];
  invitationId: DashboardInvitation['id'];
};
