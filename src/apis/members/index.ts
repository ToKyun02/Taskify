import axiosClientHelper from '@/utils/network/axiosClientHelper';
import { DeleteMemberRequest, GetMembersRequest, Members, membersSchema } from './types';
import { safeResponse } from '@/utils/network/safeResponse';

/**
 * 대시보드 멤버 목록 조회
 * https://sp-taskify-api.vercel.app/docs/#/Members/Find
 */
export const getMembers = async (params: GetMembersRequest) => {
  const { page = 1, size = 20, dashboardId } = params;
  const response = await axiosClientHelper.get<Members>('/members', {
    params: {
      size,
      page,
      dashboardId,
    },
  });
  return safeResponse(response.data, membersSchema);
};

/**
 * 대시보드 멤버 삭제
 * https://sp-taskify-api.vercel.app/docs/#/Members/Delete
 */
export const deleteMember = async (params: DeleteMemberRequest) => {
  const { memberId } = params;
  await axiosClientHelper.delete<void>(`/members/${memberId}`);
};
