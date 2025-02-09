'use client';

import { useState } from 'react';
import Link from 'next/link';
import PaginationControls from '@/components/pagination/PaginationControls';
import MyDashboardCard from '@/components/dashboard/MyDashboardCard';
import { useDashboardsQuery } from '@/apis/dashboards/queries';

const ITEMS_PER_PAGE = 15;

export default function SidebarDashboardList() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useDashboardsQuery(page, ITEMS_PER_PAGE);

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

  return (
    <div className='flex-1 overflow-y-auto [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar]:w-1'>
      <div className='mb-8'>
        <ul className='flex flex-col gap-4'>
          {isLoading && [...Array(8)].map((item, index) => <SkeletionItem key={index} />)}

          {data?.dashboards.map((item) => (
            <li key={item.id}>
              <Link href={`/dashboard/${item.id}`}>
                <MyDashboardCard title={item.title} color={item.color} createdByMe={item.createdByMe} variant='sidebar' />
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <PaginationControls canGoPrev={hasPrev} canGoNext={hasNext} handlePrev={handlePrev} handleNext={handleNext} totalPages={totalPage} alwaysShow className='hidden md:flex' />
    </div>
  );
}

export function SkeletionItem() {
  return (
    <li>
      <div className='flex h-10 animate-pulse items-center'>
        <span className='h-4 w-[80%] rounded-md bg-gray-20'></span>
      </div>
    </li>
  );
}
