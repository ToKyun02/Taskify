'use client';

import Image from 'next/image';

import { UseChunkPagination } from '@/hooks/useChunkPagination';
import PaginationControls from '../pagination/PaginationControls';
import SidebarLogo from './SidebarLogo';
import SidebarItemList from './SidebarItemList';
import add_box from '@/assets/icons/add_box.svg';

// TODO : 실제 api 요청으로 변경
import { mockDashboardData } from '@/apis/dashboards/mockData';

interface ItemList {
  id: number;
  title: string;
  color: 'green-30' | 'blue-20' | 'orange-20' | 'purple' | 'pink-20';
  createdByMe: boolean;
}

const dashboardsForSidebar: ItemList[] = mockDashboardData.dashboards.map((dash) => {
  return {
    id: dash.id,
    title: dash.title,
    color: dash.color as ItemList['color'],
    createdByMe: dash.createdByMe,
  };
});

export default function Sidebar() {
  const { currentGroups, totalPages, canGoPrev, canGoNext, handlePrev, handleNext } = UseChunkPagination({
    items: dashboardsForSidebar,
    chunkSize: 5,
    maxGroupsPerPage: 3,
  });

  return (
    <aside className='flex h-screen flex-col px-2 py-5'>
      <div className='mb-[14px] flex justify-center md:mb-14 md:justify-start'>
        <SidebarLogo />
      </div>
      <div className='mb-4 flex justify-center md:justify-between'>
        <p className='hidden text-xs font-semibold text-gray-50 md:block'>Dash Boards</p>
        <Image src={add_box} width={14} height={14} alt='add_button' className='cursor-pointer' />
      </div>
      <div className='flex-1 overflow-y-auto [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar]:w-1'>
        <div className='mb-8'>
          <SidebarItemList currentGroups={currentGroups} />
        </div>
        <PaginationControls canGoPrev={canGoPrev} canGoNext={canGoNext} handlePrev={handlePrev} handleNext={handleNext} totalPages={totalPages} alwaysShow={false} className='hidden md:flex' />
      </div>
    </aside>
  );
}
