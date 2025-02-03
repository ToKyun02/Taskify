'use client';

import Image from 'next/image';
import ArrowRight from './ArrowRight';
import ArrowLeft from './ArrowLeft';
import logo from '@/assets/images/sidebar_logo.png';
import add_box from '@/assets/icons/add_box.svg';
import crown from '@/assets/icons/crown.svg';
import Dot from './Dot';
import { useState } from 'react';

interface BoardItem {
  id: number;
  name: string;
  colorClass: 'green-30' | 'blue-20' | 'orange-20' | 'purple' | 'pink-20';
  hasCrown?: boolean;
}

const mockBoardData: BoardItem[] = [
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

function chunkArray<T>(array: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

export default function Sidebar() {
  const chunkedData = chunkArray(mockBoardData, 5);

  const MAX_GROUPS_PER_PAGE = 3;
  const totalPages = Math.ceil(chunkedData.length / MAX_GROUPS_PER_PAGE);

  const [page, setPage] = useState(1);

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
    <aside className='container w-[300px] px-2 py-5'>
      <div className='flex flex-col gap-14'>
        <Image src={logo} width={108.8} height={33} alt='logo' />
        <div className='flex flex-col gap-8'>
          <div className='flex flex-col gap-4'>
            <div className='flex justify-between'>
              <p className='text-xs font-semibold text-gray-50'>Dash Boards</p>
              <Image src={add_box} width={14} height={14} alt='add_button' />
            </div>

            <div className='flex flex-col gap-4'>
              {currentGroups.map((group, groupIndex) => (
                <div key={groupIndex} className='flex flex-col gap-2'>
                  {group.map((item) => (
                    <div key={item.id} className='flex gap-2.5 rounded-md p-3 hover:bg-violet-10'>
                      <div className='flex items-center gap-4'>
                        <Dot colorClass={item.colorClass} />
                        <div className='flex gap-1.5'>
                          <span className='text-2lg font-medium text-gray-50'>{item.name}</span>
                          {item.hasCrown && <Image src={crown} width={17} height={14} alt='crown' />}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {totalPages > 1 && (
            <div className='flex'>
              <button className='flex h-10 w-10 items-center justify-center rounded-bl-[4px] rounded-tl-[4px] border border-gray-30' onClick={handlePrev}>
                <ArrowLeft disabled={!canGoPrev} />
              </button>
              <button className='flex h-10 w-10 items-center justify-center rounded-br-[4px] rounded-tr-[4px] border border-gray-30' onClick={handleNext}>
                <ArrowRight disabled={!canGoNext} />
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
