'use client';

import { useState } from 'react';
import Link from 'next/link';
import PaginationControls from '@/components/pagination/PaginationControls';
import MyDashboardCard from '@/components/dashboard/MyDashboardCard';
import { useDashboardsQuery } from '@/apis/dashboards/queries';
import CreateDashboardButton from '../ui/Button/CreateDashboardButton';

interface MyDashboardListProps {
  onAdd: () => void;
}

const ITEMS_PER_PAGE = 5;

export default function MyDashboardList({ onAdd }: MyDashboardListProps) {
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
    <div className='grid gap-3'>
      <ul className='grid-row-6 md:grid-row-3 relative grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2'>
        <li>
          <CreateDashboardButton onAdd={onAdd} />
        </li>

        {isLoading && [...Array(5)].map((item, index) => <SkeletionItem key={index} />)}

        {data?.dashboards.map((item) => (
          <li key={item.id}>
            <Link href={`/dashboard/${item.id}`}>
              <MyDashboardCard variant='card' title={item.title} color={item.color} createdByMe={item.createdByMe} />
            </Link>
          </li>
        ))}
      </ul>

      {data?.totalCount && (
        <div className='flex items-center justify-end gap-4'>
          <span className='text-md text-gray-70'>
            {totalPage} 페이지중 {page}
          </span>
          <PaginationControls canGoPrev={hasPrev} canGoNext={hasNext} handlePrev={handlePrev} handleNext={handleNext} totalPages={data.totalCount || 0} alwaysShow />
        </div>
      )}
    </div>
  );
}

export function SkeletionItem() {
  return (
    <li>
      <div className='flex h-full animate-pulse items-center border bg-white p-6'>
        <span className='h-4 w-[80%] rounded-md bg-gray-20'></span>
      </div>
    </li>
  );
}
