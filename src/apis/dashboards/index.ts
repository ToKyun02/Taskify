import axiosHelper from '@/utils/network/axiosHelper';
import {
  BasePaginationParams,
  Dashboard,
  DashboardFormType,
  DashboardInvitation,
  DashboardInvitationResponse,
  DashboardsResponse,
  GetDashboardsParams,
  InviteDashboardType,
  updateDashboardType,
} from './types';

// dashboard 목록 조회
export const getDashboards = async ({ cursorId, page, size, navigationMethod }: GetDashboardsParams) => {
  const response = await axiosHelper.get<DashboardsResponse>('/dashboards', {
    params: {
      cursorId,
      page: page || 1,
      size: size || 10,
      navigationMethod,
    },
  });
  return response.data;
};

// dashboard 생성
export const createDashboard = async (data: DashboardFormType) => {
  const response = await axiosHelper.post<Dashboard>('/dashboards', data);
  return response.data;
};

// dashboard 상세 조회
export const getDashboardDetails = async (id: number) => {
  const response = await axiosHelper.get<Dashboard>(`/dashboards/${id}`);
  return response.data;
};

// dashboard 수정
export const updateDashboard = async (id: number, data: updateDashboardType) => {
  const response = await axiosHelper.put<Dashboard>(`/dashboards/${id}`, data);
  return response.data;
};

// dashboard 삭제
export const deleteDashboard = async (id: number) => {
  const response = await axiosHelper.delete<void>(`/dashboards/${id}`);
  return response.data;
};

// dashboard 초대 불러오기
export const getDashboardInvitations = async (id: number, { page, size }: BasePaginationParams) => {
  const response = await axiosHelper.get<DashboardInvitation>(`/dashboards/${id}/invitations`, {
    params: {
      page: page || 1,
      size: size || 10,
    },
  });
  return response.data;
};

// dashboard 초대
export const inviteDashboard = async (id: number, data: InviteDashboardType) => {
  const response = await axiosHelper.post<DashboardInvitationResponse>(`/dashboards/${id}/invitations`, data);
  return response.data;
};

// dashboard 초대 취소
export const cancelDashboardInvitation = async (id: number, invitationId: number) => {
  const response = await axiosHelper.delete<void>(`/dashboards/${id}/invitations/${invitationId}`);
  return response.data;
};
