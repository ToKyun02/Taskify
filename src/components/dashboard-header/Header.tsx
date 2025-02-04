'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Crown from '@/assets/icons/crown.svg';
import Title from './Title';
import SettingBtn from './SettingBtn';

interface HeaderProps {
  title?: string;
  showCrown?: boolean;
  showSetting?: boolean;
  showUsers?: boolean;
  showProfile?: boolean;
}

const titleMap: { [key: string]: string } = {
  '/mydashboard': '내 대시보드',
  '/mypage': '계정관리',
};

// API 연동 이후 추가 작업 예정, 우선 mock 데이터로 집어넣어놨습니다.
interface UserType {
  nickname: string;
  profileImageUrl: string;
}

const mockUser: UserType = {
  nickname: '배유철',
  profileImageUrl: 'B',
};

export default function Header({ showCrown = false, showSetting = false, showUsers = false, showProfile = false }: HeaderProps) {
  const pathname = usePathname();
  const title = titleMap[pathname] || '내 대시보드';
  const handleSettingClick = () => {
    console.log('관리 버튼 클릭');
  };

  const handleInviteClick = () => {
    console.log('초대 버튼 클릭');
  };

  const handleProfileClick = () => {
    console.log('프로필 버튼 클릭');
  };

  return (
    <header className='flex h-[60px] w-full items-center justify-between border-b-2 border-gray-20 py-[15.5px] sm:h-[70px] sm:px-[40px]'>
      {/* 왼쪽 제목 그룹 */}
      <div className='flex items-center gap-[8px]'>
        <Title title={title} />
        {showCrown && <Image src={Crown} alt='방장 표시' className='hidden h-[16px] w-[20px] lg:block' />}
      </div>
      {/* 오른쪽 버튼 그룹 */}
      <div className='flex items-center'>
        <>
          <div className='flex items-center gap-[16px] border-r border-gray-30 pr-[12px] sm:gap-[32px] sm:pr-[24px] md:gap-[40px] md:pr-[32px]'>
            {showSetting && <SettingBtn onSettingClick={handleSettingClick} onInviteClick={handleInviteClick} />}
            {showUsers && (
              <div className='flex'>
                <span className='-ml-[8px] flex h-[34px] w-[34px] items-center justify-center rounded-full border-2 border-white bg-green-30 text-white sm:h-[38px] sm:w-[38px]'>
                  {mockUser.profileImageUrl}
                </span>
                <span className='-ml-[8px] flex h-[34px] w-[34px] items-center justify-center rounded-full border-2 border-white bg-green-30 text-white sm:h-[38px] sm:w-[38px]'>
                  {mockUser.profileImageUrl}
                </span>
                <span className='-ml-[8px] flex h-[34px] w-[34px] items-center justify-center rounded-full border-2 border-white bg-green-30 text-white sm:h-[38px] sm:w-[38px]'>
                  {mockUser.profileImageUrl}
                </span>
              </div>
            )}
          </div>
          {showProfile && (
            <button onClick={handleProfileClick} className='mr-[40px] flex items-center justify-center gap-[12px] pl-[12px] sm:pl-[24px] md:pl-[32px]'>
              <span className='flex h-[34px] w-[34px] items-center justify-center rounded-full border-2 border-white bg-green-30 text-white sm:h-[38px] sm:w-[38px]'>{mockUser.profileImageUrl}</span>
              <span className='hidden text-[16px] md:block'>{mockUser.nickname}</span>
            </button>
          )}
        </>
      </div>
    </header>
  );
}
