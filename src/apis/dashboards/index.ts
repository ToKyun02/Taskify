import axiosClientHelper from '@/utils/network/axiosClientHelper';
import {
  BasePaginationParams,
  Dashboard,
  DashboardFormType,
  DashboardInvitation,
  DashboardInvitationResponse,
  dashboardSchema,
  DashboardsResponse,
  dashboardsResponseSchema,
  GetDashboardsParams,
  InviteDashboardType,
} from './types';

// dashboard 목록 조회
export const getDashboards = async ({ cursorId, page, size, navigationMethod }: GetDashboardsParams) => {
  const response = await axiosClientHelper.get<DashboardsResponse>('/dashboards', {
    params: {
      cursorId,
      page: page || 1,
      size: size || 10,
      navigationMethod,
    },
  });

  const result = dashboardsResponseSchema.safeParse(response.data);
  if (!result.success) {
    throw new Error('서버에서 받은 데이터가 예상과 다릅니다.');
  }
  return result.data;
};

// dashboard 생성
export const createDashboard = async (data: DashboardFormType) => {
  const response = await axiosClientHelper.post<Dashboard>('/dashboards', data);

  const result = dashboardSchema.safeParse(response.data);
  if (!result.success) {
    throw new Error('서버에서 받은 데이터가 예상과 다릅니다.');
  }
  return result.data;
};

// dashboard 상세 조회
export const getDashboardDetails = async (id: number) => {
  const response = await axiosClientHelper.get<Dashboard>(`/dashboards/${id}`);

  const result = dashboardSchema.safeParse(response.data);
  if (!result.success) {
    throw new Error('서버에서 받은 데이터가 예상과 다릅니다.');
  }
  return result.data;
};

// dashboard 수정
export const updateDashboard = async (id: number, data: DashboardFormType) => {
  const response = await axiosClientHelper.put<Dashboard>(`/dashboards/${id}`, data);

  const result = dashboardSchema.safeParse(response.data);
  if (!result.success) {
    throw new Error('서버에서 받은 데이터가 예상과 다릅니다.');
  }
  return result.data;
};

// dashboard 삭제
export const deleteDashboard = async (id: number) => {
  const response = await axiosClientHelper.delete<void>(`/dashboards/${id}`);
  return response.data;
};

// TODO : UserSchema 추가이후, Invitation schema가 작성되면 응답 검증 로직 추가 필요
// dashboard 초대 불러오기
export const getDashboardInvitations = async (id: number, { page, size }: BasePaginationParams) => {
  const response = await axiosClientHelper.get<DashboardInvitation>(`/dashboards/${id}/invitations`, {
    params: {
      page: page || 1,
      size: size || 10,
    },
  });
  return response.data;
};

// TODO : UserSchema 추가이후, Invitation schema가 작성되면 응답 검증 로직 추가 필요
// dashboard 초대
export const inviteDashboard = async (id: number, data: InviteDashboardType) => {
  const response = await axiosClientHelper.post<DashboardInvitationResponse>(`/dashboards/${id}/invitations`, data);
  return response.data;
};

// dashboard 초대 취소
export const cancelDashboardInvitation = async (id: number, invitationId: number) => {
  const response = await axiosClientHelper.delete<void>(`/dashboards/${id}/invitations/${invitationId}`);
  return response.data;
};
