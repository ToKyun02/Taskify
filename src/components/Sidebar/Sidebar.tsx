'use client';

import { useState } from 'react';
import Image from 'next/image';

import { chunkArray } from '@/utils/chunkArray';
import SidebarLogo from './SidebarLogo';
import SidebarItemList from './SidebarItemList';
import SidebarPaginationControls from './SidebarPaginationControls';

import add_box from '@/assets/icons/add_box.svg';

interface ItemList {
  id: number;
  name: string;
  colorClass: 'green-30' | 'blue-20' | 'orange-20' | 'purple' | 'pink-20';
  hasCrown?: boolean;
}

const mockBoardData: ItemList[] = [
  { id: 1, name: '비브리지', colorClass: 'green-30', hasCrown: true },
  { id: 2, name: '코드잇', colorClass: 'blue-20', hasCrown: true },
  { id: 3, name: '3분기 계획', colorClass: 'green-30' },
  { id: 4, name: '회의록', colorClass: 'blue-20' },
  { id: 5, name: '중요 문서함', colorClass: 'pink-20' },
  { id: 6, name: '비브리지', colorClass: 'blue-20', hasCrown: true },
  { id: 7, name: '코드잇', colorClass: 'purple', hasCrown: true },
  { id: 8, name: '3분기 계획', colorClass: 'blue-20' },
  { id: 9, name: '회의록', colorClass: 'purple' },
  { id: 10, name: '중요 문서함', colorClass: 'blue-20' },
  { id: 11, name: '비브리지', colorClass: 'blue-20', hasCrown: true },
  { id: 12, name: '코드잇', colorClass: 'pink-20', hasCrown: true },
  { id: 13, name: '3분기 계획', colorClass: 'orange-20' },
  { id: 14, name: '회의록', colorClass: 'blue-20' },
  { id: 15, name: '중요 문서함', colorClass: 'blue-20' },
  { id: 16, name: '중요 테스트', colorClass: 'blue-20' },
];

export default function Sidebar() {
  const MAX_GROUPS_PER_PAGE = 3;
  const [page, setPage] = useState(1);
  const chunkedData = chunkArray(mockBoardData, 5);

  const totalPages = Math.ceil(chunkedData.length / MAX_GROUPS_PER_PAGE);

  const startIndex = (page - 1) * MAX_GROUPS_PER_PAGE;
  const endIndex = page * MAX_GROUPS_PER_PAGE;
  const currentGroups = chunkedData.slice(startIndex, endIndex);

  const canGoPrev = page > 1;
  const canGoNext = page < totalPages;

  const handlePrev = () => {
    if (canGoPrev) setPage((prev) => prev - 1);
  };
  const handleNext = () => {
    if (canGoNext) setPage((prev) => prev + 1);
  };

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

          {totalPages > 1 && <SidebarPaginationControls canGoPrev={canGoPrev} canGoNext={canGoNext} handlePrev={handlePrev} handleNext={handleNext} />}
        </div>
      </div>
    </aside>
  );
}
