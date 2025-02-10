import { z } from 'zod';
import { DASHBOARD_FORM_ERROR_MESSAGE, DASHBOARD_FORM_VALID_LENGTH } from '@/constants/dashboard';
import { DEFAULT_COLORS } from '@/constants/colors';

// base pagination params 타입 (필요시 공용으로 추출)
export type BasePaginationParams = {
  page?: number;
  size?: number;
};

// dashboard 항목 타입
export const dashboardSchema = z.object({
  id: z.number(),
  title: z.string(),
  color: z.enum(DEFAULT_COLORS).catch(DEFAULT_COLORS[0]),
  createdAt: z.string(),
  updatedAt: z.string(),
  createdByMe: z.boolean(),
  userId: z.number(),
});
export type Dashboard = z.infer<typeof dashboardSchema>;

// dashboard 리스트 응답 타입
export const dashboardsResponseSchema = z.object({
  cursorId: z.number().nullable(),
  totalCount: z.number(),
  dashboards: z.array(dashboardSchema),
});
export type DashboardsResponse = z.infer<typeof dashboardsResponseSchema>;

// dashboard get params 타입
export type NavigationMethod = 'infiniteScroll' | 'pagination';
export type GetDashboardsParams = BasePaginationParams & {
  cursorId?: number;
  navigationMethod: NavigationMethod;
};

// dashboard 작성 스키마
export const dashboardFormSchema = z.object({
  title: z
    .string()
    .min(DASHBOARD_FORM_VALID_LENGTH.TITLE.MIN, { message: DASHBOARD_FORM_ERROR_MESSAGE.TITLE.MIN })
    .max(DASHBOARD_FORM_VALID_LENGTH.TITLE.MAX, { message: DASHBOARD_FORM_ERROR_MESSAGE.TITLE.MAX }),
  color: z.enum(DEFAULT_COLORS),
});
export type DashboardFormType = z.infer<typeof dashboardFormSchema>;

// TODO : 임시 유저 스키마(추후 /apis/auth 쪽에서 작성된 schema 임포트 필요)
export const userSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  nickname: z.string(),
});

export const invitationUserSchema = userSchema.pick({
  id: true,
  email: true,
  nickname: true,
});
export const invitationDashboardSchema = dashboardSchema.pick({ id: true, title: true });

// dashbaord invitation 타입
export const dashboardInvitationSchema = z.object({
  id: z.number(),
  inviter: invitationUserSchema,
  invitee: invitationUserSchema,
  teamId: z.string(),
  dashboard: invitationDashboardSchema,
  inviteAccepted: z.boolean().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type DashboardInvitation = z.infer<typeof dashboardInvitationSchema>;

// dashboard invitations 리스트 응답 타입
export const dashboardInvitationsResponseSchema = z.object({
  totalCount: z.number(),
  invitations: z.array(dashboardInvitationSchema),
});
export type DashboardInvitationsResponse = z.infer<typeof dashboardInvitationsResponseSchema>;

// invitation 스키마
export const inviteDashboardFormSchema = z.object({
  email: z.string().email({ message: DASHBOARD_FORM_ERROR_MESSAGE.EMAIL.INVALID }),
});
export type InviteDashboardType = z.infer<typeof inviteDashboardFormSchema>;
