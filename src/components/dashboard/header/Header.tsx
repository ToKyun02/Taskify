'use client';

import { useParams, useSelectedLayoutSegment } from 'next/navigation';
import Profile from '@/components/dashboard/header/Profile';
import DashboardInfo from '@/components/dashboard/header/DashboardInfo';
import { PAGE_TITLE } from '@/constants/dashboard';

export default function Header() {
  const { id } = useParams();
  const isDashboardPage = !!id;

  const segment = useSelectedLayoutSegment();
  const currentPageTitle = PAGE_TITLE[segment as keyof typeof PAGE_TITLE] || '';

  return (
    <header className='flex h-[60px] w-full items-center justify-between border-b-2 border-gray-20 px-3 py-[15px] sm:h-[70px] md:px-8 lg:px-10'>
      <div className='flex-1'>
        {/* 페이지 제목 or 대시보드 정보 */}
        {!isDashboardPage ? <h2 className='text-xl font-bold'>{currentPageTitle}</h2> : <DashboardInfo />}
      </div>
      <div className='ml-auto'>
        <Profile />
      </div>
    </header>
  );
}
