import axiosClientHelper from '@/utils/network/axiosClientHelper';
import { MyInvitationsParams, MyInvitationsResponse, myInvitationsResponseSchema, RespondToInvitation } from './types';
import { DashboardInvitation, dashboardInvitationSchema } from '../dashboards/types';

export const getMyInvitations = async ({ cursorId, size, title }: MyInvitationsParams) => {
  const response = await axiosClientHelper.get<MyInvitationsResponse>('/invitations', {
    params: {
      size: size || 10,
      ...(title && { title }), // 검색어가 있을경우에만(빈값 보내면 오류)
      ...(cursorId && { cursorId }), //cursorId가 있을경우에만(빈값 보내면 오류)
    },
  });

  const result = myInvitationsResponseSchema.safeParse(response.data);
  if (!result.success) {
    throw new Error('서버에서 받은 데이터가 예상과 다릅니다.');
  }
  return result.data;
};

export const respondToInvitation = async (id: number, data: RespondToInvitation) => {
  const response = await axiosClientHelper.put<DashboardInvitation>(`/invitations/${id}`, data);

  const result = dashboardInvitationSchema.safeParse(response.data);
  if (!result.success) {
    throw new Error('서버에서 받은 데이터가 예상과 다릅니다.');
  }
  return result.data;
};
