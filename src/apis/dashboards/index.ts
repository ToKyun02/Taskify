import axiosClientHelper from '@/utils/network/axiosClientHelper';
import { safeResponse } from '@/utils/network/safeResponse';
import {
  Dashboard,
  DashboardInvitation,
  dashboardSchema,
  dashboardsSchema,
  CreateDashboardRequest,
  UpdateDashboardRequest,
  GetDashboardInvitationsRequest,
  GetDashboardsRequest,
  Dashboards,
  DashboardInvitations,
  dashboardInvitationsSchema,
  InviteDashboardRequest,
  dashboardInvitationSchema,
  CancelInviteDashboardRequest,
} from '@/apis/dashboards/types';

/**
 * dashboard 생성
 * https://sp-taskify-api.vercel.app/docs/#/Dashboards/Create
 */
export const createDashboard = async (params: CreateDashboardRequest) => {
  const response = await axiosClientHelper.post<Dashboard>('/dashboards', params);
  return safeResponse(response.data, dashboardSchema);
};

/**
 * dashboards 목록 조회
 * https://sp-taskify-api.vercel.app/docs/#/Dashboards/Find
 */
export const getDashboards = async (params: GetDashboardsRequest) => {
  const { cursorId, page = 1, size = 10, navigationMethod } = params;
  const response = await axiosClientHelper.get<Dashboards>('/dashboards', {
    params: {
      cursorId,
      page,
      size,
      navigationMethod,
    },
  });
  return safeResponse(response.data, dashboardsSchema);
};

/**
 * dashboard 상세 조회
 * https://sp-taskify-api.vercel.app/docs/#/Dashboards/Get
 */
export const getDashboardDetails = async (id: Dashboard['id']) => {
  const response = await axiosClientHelper.get<Dashboard>(`/dashboards/${id}`);
  return safeResponse(response.data, dashboardSchema);
};

/**
 * dashboard 수정
 * https://sp-taskify-api.vercel.app/docs/#/Dashboards/Update
 */
export const updateDashboard = async (params: UpdateDashboardRequest) => {
  const { id, ...reset } = params;
  const response = await axiosClientHelper.put<Dashboard>(`/dashboards/${id}`, reset);
  return safeResponse(response.data, dashboardSchema);
};

/**
 * dashboard 삭제
 * https://sp-taskify-api.vercel.app/docs/#/Dashboards/Delete
 */
export const deleteDashboard = async (id: Dashboard['id']) => {
  const response = await axiosClientHelper.delete<void>(`/dashboards/${id}`);
  return response.data;
};

/**
 * dashboard 초대
 * https://sp-taskify-api.vercel.app/docs/#/Dashboards/CreateInvitation
 */
export const inviteDashboard = async (params: InviteDashboardRequest) => {
  const { id, email } = params;
  const response = await axiosClientHelper.post<DashboardInvitation>(`/dashboards/${id}/invitations`, { email });
  return safeResponse(response.data, dashboardInvitationSchema);
};

/**
 * dashboard 초대 불러오기
 * https://sp-taskify-api.vercel.app/docs/#/Dashboards/GetInvitations
 */
export const getDashboardInvitations = async (params: GetDashboardInvitationsRequest) => {
  const { id, page = 1, size = 10 } = params;
  const response = await axiosClientHelper.get<DashboardInvitations>(`/dashboards/${id}/invitations`, {
    params: {
      page,
      size,
    },
  });
  return safeResponse(response.data, dashboardInvitationsSchema);
};

/**
 * dashboard 초대 취소
 * https://sp-taskify-api.vercel.app/docs/#/Dashboards/DeleteInvitation
 */
export const cancelDashboardInvitation = async (params: CancelInviteDashboardRequest) => {
  const { dashboardId, invitationId } = params;
  await axiosClientHelper.delete<void>(`/dashboards/${dashboardId}/invitations/${invitationId}`);
};
