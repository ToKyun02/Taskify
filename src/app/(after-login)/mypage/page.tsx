import { redirect } from 'next/navigation';
import { User, userSchema } from '@/apis/users/types';
import { Page, PageInner } from '@/components/layout/Page';
import PasswordEdit from '@/components/profile/PasswordEdit';
import ProfileEdit from '@/components/profile/ProfileEdit';
import GoBackLink from '@/components/ui/Link/GoBackLink';
import axiosServerHelper from '@/utils/network/axiosServerHelper';
import { safeResponse } from '@/utils/network/safeResponse';

export const metadata = {
  title: 'Taskify - 마이페이지',
  description: 'Taskify 마이페이지에서 계정 정보와 활동 내역을 한눈에 확인해 보세요.',
  keywords: ['일정', '공유', '커뮤니티', '할 일', 'Taskify'],
  openGraph: {
    title: 'Taskify - 마이페이지',
    description: 'Taskify 마이페이지에서 계정 정보와 활동 내역을 한눈에 확인해 보세요.',
    url: 'https://taskify-lab.vercel.app/mypage',
    type: 'website',
    images: [
      {
        url: 'https://taskify-lab.vercel.app/meta.png',
        width: 1200,
        height: 630,
        alt: 'Taskify 마이페이지 이미지',
      },
    ],
  },
};

export default async function MyPage() {
  const response = await axiosServerHelper<User>('/users/me');
  const userData = safeResponse(response.data, userSchema);

  if (!userData) {
    redirect('/login');
  }

  return (
    <Page>
      <PageInner>
        <div className='mb-8'>
          <GoBackLink href='/mydashboard' />
        </div>
        <div className='grid gap-4'>
          {/* 프로필 수정 */}
          <ProfileEdit user={userData} />

          {/* 비밀번호 수정 */}
          <PasswordEdit />
        </div>
      </PageInner>
    </Page>
  );
}
