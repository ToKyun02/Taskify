import { z } from 'zod';
import { User } from '../users/types';
import { DASHBOARD_FORM_ERROR_MESSAGE, DASHBOARD_FORM_VALID_LENGTH } from '@/constants/dashboard';
import { DEFAULT_COLORS } from '@/constants/colors';

// base pagination params 타입 (필요시 공용으로 추출)
export const basePaginationParamsSchema = z.object({
  page: z.number().optional(),
  size: z.number().optional(),
});
export type BasePaginationParams = z.infer<typeof basePaginationParamsSchema>;

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
export const getDashboardsParamsSchema = basePaginationParamsSchema.extend({
  cursorId: z.number().optional(),
  navigationMethod: z.enum(['infiniteScroll', 'pagination']),
});
export type GetDashboardsParams = z.infer<typeof getDashboardsParamsSchema>;

// dashboard 작성 스키마
export const dashboardFormSchema = z.object({
  title: z
    .string()
    .min(DASHBOARD_FORM_VALID_LENGTH.TITLE.MIN, { message: DASHBOARD_FORM_ERROR_MESSAGE.TITLE.MIN })
    .max(DASHBOARD_FORM_VALID_LENGTH.TITLE.MAX, { message: DASHBOARD_FORM_ERROR_MESSAGE.TITLE.MAX }),
  color: z.string(),
});
export type DashboardFormType = z.infer<typeof dashboardFormSchema>;

// TODO : UserSchema가 추가로 작성되면 zod schema로 변경
// invitation 타입
export type InvitationUser = Pick<User, 'id' | 'email' | 'nickname'>;
export type InvitationDashboard = Pick<Dashboard, 'id' | 'title'>;
export type DashboardInvitation = {
  id: number;
  inviter: InvitationUser;
  invitee: InvitationUser;
  teamId: string;
  dashboard: InvitationDashboard;
  inviteAccepted: boolean;
  createdAt: string;
  updatedAt: string;
};

// invitation 리스트 응답 타입
export type DashboardInvitationResponse = {
  totalCount: number;
  invitations: DashboardInvitation[];
};

// invitation 스키마
export const inviteDashboardFormSchema = z.object({
  email: z.string().email({ message: DASHBOARD_FORM_ERROR_MESSAGE.EMAIL.INVALID }),
});
export type InviteDashboardType = z.infer<typeof inviteDashboardFormSchema>;
