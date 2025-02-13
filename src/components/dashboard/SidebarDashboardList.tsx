'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/utils/helper';
import { useDashboardsQuery } from '@/apis/dashboards/queries';
import PaginationControls from '@/components/pagination/PaginationControls';
import Dot from '@/components/ui/Dot/Dot';
import crown from '@/assets/icons/crown.svg';
import menu from '@/assets/icons/hamburger.svg';
import { useParams } from 'next/navigation';

const ITEMS_PER_PAGE = 15;

export default function SidebarDashboardList({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  const [page, setPage] = useState(1);
  const { data, isFetching } = useDashboardsQuery({
    page,
    size: ITEMS_PER_PAGE,
    navigationMethod: 'pagination',
  });

  const totalCount = data?.totalCount || 0;
  const totalPage = Math.ceil(totalCount / ITEMS_PER_PAGE);
  const hasNext = page < totalPage;
  const hasPrev = page > 1;

  const handlePrev = () => {
    setPage((prev) => prev - 1);
  };
  const handleNext = () => {
    setPage((prev) => prev + 1);
  };

  const params = useParams();

  return (
    <div className='flex flex-1 flex-col overflow-y-auto [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar]:w-1'>
      <div className='px-1 lg:px-3'>
        <ul className='mb-20'>
          {isFetching
            ? [...Array(8)].map((item, index) => <SkeletionItem key={index} />)
            : data?.dashboards.map((item) => (
                <li key={item.id}>
                  <Link
                    href={`/dashboard/${item.id}`}
                    className={cn(
                      'y-2 flex h-12 min-w-0 items-center gap-3 rounded-lg px-4',
                      params.id === String(item.id) && 'bg-violet-10 text-violet-20',
                      'hover:bg-violet-10 hover:text-violet-20 md:px-1',
                    )}
                  >
                    <div className='flex h-full w-6 flex-shrink-0 items-center justify-center'>
                      <Dot color={item.color} />
                    </div>

                    <span className={cn('hidden overflow-hidden text-ellipsis whitespace-nowrap text-md md:block', open && 'block')}>{item.title}</span>

                    {item.createdByMe && (
                      <figure className={cn('flex-0 hidden h-8 w-8 items-center justify-center md:flex', open && 'flex')}>
                        <Image src={crown} alt='crown' className='h-auto w-4' />
                      </figure>
                    )}
                  </Link>
                </li>
              ))}
        </ul>
      </div>

      <div className='absolute bottom-0 left-0 flex h-16 w-full items-center justify-end border-t bg-white px-4 shadow-[0_-10px_20px_rgba(0,0,0,0.03)]'>
        <button className='absolute left-4 top-1/2 flex h-8 w-8 -translate-y-1/2 flex-col items-center justify-center gap-1 rounded-lg hover:bg-violet-10 md:hidden' onClick={onToggle}>
          <Image src={menu} alt='menu' />
        </button>
        <PaginationControls
          canGoPrev={hasPrev}
          canGoNext={hasNext}
          handlePrev={handlePrev}
          handleNext={handleNext}
          totalPages={totalPage}
          alwaysShow
          className={cn('hidden md:flex', open && 'flex')}
        />
      </div>
    </div>
  );
}

export function SkeletionItem() {
  return (
    <li>
      <div className='flex h-10 animate-pulse items-center px-3'>
        <span className='h-4 w-full rounded-md bg-gray-20'></span>
      </div>
    </li>
  );
}
