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
    <aside className='h-screen w-[67px] px-2 py-5 md:w-[160px] lg:w-[300px]'>
      <div className='flex flex-col items-center gap-[14px] md:items-center md:gap-14 lg:items-stretch'>
        <SidebarLogo />

        <div className='flex flex-col gap-8'>
          <div className='flex flex-col gap-4'>
            <div className='flex justify-center md:justify-between'>
              <p className='hidden text-xs font-semibold text-gray-50 md:block'>Dash Boards</p>
              <Image src={add_box} width={14} height={14} alt='add_button' className='cursor-pointer' />
            </div>
            <SidebarItemList currentGroups={currentGroups} />
          </div>

          <PaginationControls canGoPrev={canGoPrev} canGoNext={canGoNext} handlePrev={handlePrev} handleNext={handleNext} totalPages={totalPages} alwaysShow={false} className='hidden md:flex' />
        </div>
      </div>
    </aside>
  );
}
