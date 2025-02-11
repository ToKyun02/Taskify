import axiosClientHelper from '@/utils/network/axiosClientHelper';
import { DeleteMemberRequest, GetMembersRequest, Members, membersSchema } from './types';

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

  const result = membersSchema.safeParse(response.data);
  if (!result.success) {
    throw new Error('서버에서 받은 데이터가 예상과 다릅니다.');
  }
  return result.data;
};

/**
 * 대시보드 멤버 삭제
 * https://sp-taskify-api.vercel.app/docs/#/Members/Delete
 */
export const deleteMember = async (params: DeleteMemberRequest) => {
  const { memberId } = params;
  const response = await axiosClientHelper.delete<void>(`/members/${memberId}`);
  return response.data;
};
