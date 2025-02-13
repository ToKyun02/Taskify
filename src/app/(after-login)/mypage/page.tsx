import { redirect } from 'next/navigation';
import { User, userSchema } from '@/apis/users/types';
import PasswordEdit from '@/components/profile/PasswordEdit';
import ProfileEdit from '@/components/profile/ProfileEdit';
import GoBackLink from '@/components/ui/Link/GoBackLink';
import axiosServerHelper from '@/utils/network/axiosServerHelper';
import { safeResponse } from '@/utils/network/safeResponse';

export default async function MyPage() {
  const response = await axiosServerHelper<User>('/users/me');
  const userData = safeResponse(response.data, userSchema);

  if (!userData) {
    redirect('/login');
  }

  return (
    <div className='p-10'>
      <div className='mb-8'>
        <GoBackLink href='/mydashboard' />
      </div>
      <div className='grid w-full max-w-[620px] gap-4'>
        {/* 프로필 수정 */}
        <ProfileEdit user={userData} />

        {/* 비밀번호 수정 */}
        <PasswordEdit />
      </div>
    </div>
  );
}
