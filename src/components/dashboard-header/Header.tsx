'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Crown from '@/assets/icons/crown.svg';
import Title from './Title';
import SettingBtn from './SettingBtn';
import Members from './Members';
import Profile from './Profile';

interface HeaderProps {
  title?: string;
  showCrown?: boolean;
  showSetting?: boolean;
  showMembers?: boolean;
  showProfile?: boolean;
}

const titleMap: { [key: string]: string } = {
  '/mydashboard': '내 대시보드',
  '/mypage': '계정관리',
};

// TODO : API 연동 이후 추가 작업 예정, 우선 mock 데이터로 집어넣어놨습니다.
interface UserType {
  nickname: string;
  profileImageUrl: string;
}

const mockUsers: UserType[] = [
  { nickname: '배유철', profileImageUrl: 'B' },
  { nickname: '김철수', profileImageUrl: 'K' },
  { nickname: '이영희', profileImageUrl: 'L' },
];

export default function Header({ showCrown = false, showSetting = false, showMembers = false, showProfile = false }: HeaderProps) {
  const pathname = usePathname();
  const title = titleMap[pathname] || '내 대시보드';
  const handleSettingClick = () => {
    console.log('관리 버튼 클릭');
    // TODO : 디버깅 용도 console.log API 기능 구현 후 수정 예정
  };

  const handleInviteClick = () => {
    console.log('초대 버튼 클릭');
    // TODO : 디버깅 용도 console.log API 기능 구현 후 수정 예정
  };

  const handleProfileClick = () => {
    console.log('프로필 버튼 클릭');
    // TODO : 디버깅 용도 console.log API 기능 구현 후 수정 예정
  };

  return (
    <header className='flex h-[60px] w-full items-center justify-between border-b-2 border-gray-20 py-[15.5px] sm:h-[70px] sm:px-[40px]'>
      {/* 왼쪽 제목 그룹 */}
      <div className='flex items-center gap-[8px]'>
        <Title title={title} />
        {showCrown && <Image src={Crown} alt='방장 표시' width={20} height={16} className='hidden lg:block' />}
      </div>
      {/* 오른쪽 버튼 그룹 */}
      <div className='flex items-center'>
        <div className='flex items-center gap-[16px] border-r border-gray-30 pr-[12px] sm:gap-[32px] sm:pr-[24px] md:gap-[40px] md:pr-[32px]'>
          {showSetting && <SettingBtn onSettingClick={handleSettingClick} onInviteClick={handleInviteClick} />}
          {showMembers && <Members users={mockUsers} />}
        </div>
        {showProfile && <Profile nickname={mockUsers[0].nickname} profileImageUrl={mockUsers[0].profileImageUrl} onClick={handleProfileClick} />}
      </div>
    </header>
  );
}
