import axiosClientHelper from '@/utils/network/axiosClientHelper';
import { MembersParams, MembersRespons, membersResponseSchema } from './types';

export const getMembers = async ({ page, size, dashboardId }: MembersParams) => {
  const response = await axiosClientHelper.get<MembersRespons>('/members', {
    params: {
      size: size || 20,
      page: page || 1,
      dashboardId,
    },
  });

  const result = membersResponseSchema.safeParse(response.data);
  if (!result.success) {
    throw new Error('서버에서 받은 데이터가 예상과 다릅니다.');
  }
  return result.data;
};

export const deleteMember = async (memberId: number) => {
  const response = await axiosClientHelper.delete<void>(`/members/${memberId}`);
  return response.data;
};
