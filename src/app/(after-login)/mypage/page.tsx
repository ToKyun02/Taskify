import PasswordEdit from '@/components/profile/PasswordEdit';
import ProfileEdit from '@/components/profile/ProfileEdit';

export default function MyPage() {
  return (
    <div className='mx-10 flex max-w-[670px] flex-col'>
      {/* TODO: 돌아가기 컴포넌트 연동 */}

      <ProfileEdit />

      <PasswordEdit />
    </div>
  );
}
