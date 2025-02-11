import axiosClientHelper from '@/utils/network/axiosClientHelper';
import { GetMyInvitationsRequest, MyInvitations, myInvitationsSchema, RespondToInvitationRequest } from './types';
import { DashboardInvitation, dashboardInvitationSchema } from '../dashboards/types';
import { safeResponse } from '@/utils/network/safeResponse';

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

  return safeResponse(response.data, myInvitationsSchema);
};

/**
 * 초대 응답
 * https://sp-taskify-api.vercel.app/docs/#/Invitations/Update
 */
export const respondToInvitation = async (params: RespondToInvitationRequest) => {
  const { invitationId, inviteAccepted } = params;
  const response = await axiosClientHelper.put<DashboardInvitation>(`/invitations/${invitationId}`, { inviteAccepted });

  return safeResponse(response.data, dashboardInvitationSchema);
};
