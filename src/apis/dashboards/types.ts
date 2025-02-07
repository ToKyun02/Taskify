import { z } from 'zod';
import { User } from '../users/types';
import { DASHBOARD_FORM_ERROR_MESSAGE, DASHBOARD_FORM_VALID_LENGTH } from '@/constants/dashboard';

// base pagination params 타입 (필요시 공용으로 추출)
export type BasePaginationParams = {
  page?: number;
  size?: number;
};

// dashboard 항목 타입
export type Dashboard = {
  id: number;
  title: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  createdByMe: boolean;
  userId: number;
};

// dashboard 리스트 응답 타입
export type DashboardsResponse = {
  cursorId: number | null;
  totalCount: number;
  dashboards: Dashboard[];
};

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
  color: z.string(),
});
export type DashboardFormType = z.infer<typeof dashboardFormSchema>;

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
