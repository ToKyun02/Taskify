import axiosClientHelper from '@/utils/network/axiosClientHelper';
import { GetMyInvitationsRequest, MyInvitations, myInvitationsSchema, RespondToInvitationRequest } from './types';
import { DashboardInvitation, dashboardInvitationSchema } from '../dashboards/types';

/**
 * 내가 받은 초대 목록 조회
 * https://sp-taskify-api.vercel.app/docs/#/Invitations/Find
 */
export const getMyInvitations = async (params: GetMyInvitationsRequest) => {
  const { cursorId, size = 10, title } = params;
  const response = await axiosClientHelper.get<MyInvitations>('/invitations', {
    params: {
      size,
      ...(title && { title }), // 검색어가 있을경우에만(빈값 보내면 오류)
      ...(cursorId && { cursorId }), //cursorId가 있을경우에만(빈값 보내면 오류)
    },
  });

  const result = myInvitationsSchema.safeParse(response.data);
  if (!result.success) {
    throw new Error('서버에서 받은 데이터가 예상과 다릅니다.');
  }
  return result.data;
};

/**
 * 초대 응답
 * https://sp-taskify-api.vercel.app/docs/#/Invitations/Update
 */
export const respondToInvitation = async (params: RespondToInvitationRequest) => {
  const { invitationId, inviteAccepted } = params;
  const response = await axiosClientHelper.put<DashboardInvitation>(`/invitations/${invitationId}`, { inviteAccepted });

  const result = dashboardInvitationSchema.safeParse(response.data);
  if (!result.success) {
    throw new Error('서버에서 받은 데이터가 예상과 다릅니다.');
  }
  return result.data;
};
