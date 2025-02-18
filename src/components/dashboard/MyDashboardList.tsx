'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useDashboardsQuery } from '@/apis/dashboards/queries';
import MyDashboardCard from '@/components/dashboard/MyDashboardCard';
import DashboardButton from '@/components/ui/Button/DashboardButton';
import PaginationWithCounter from '@/components/pagination/PaginationWithCounter';

interface MyDashboardListProps {
  onAdd: () => void;
}

const ITEMS_PER_PAGE = 5;

export default function MyDashboardList({ onAdd }: MyDashboardListProps) {
  const [page, setPage] = useState(1);
  const { data, isFetching } = useDashboardsQuery({
    page,
    size: ITEMS_PER_PAGE,
    navigationMethod: 'pagination',
  });

  return (
    <div className='grid gap-3'>
      <ul className='grid-row-6 md:grid-row-3 relative grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2'>
        <li>
          <DashboardButton variant='createDashboard' onClick={onAdd} />
        </li>

        {isFetching
          ? [...Array(5)].map((item, index) => <SkeletionItem key={index} />)
          : data?.dashboards.map((item) => (
              <li key={item.id}>
                <Link href={`/dashboard/${item.id}`}>
                  <MyDashboardCard variant='card' title={item.title} color={item.color} createdByMe={item.createdByMe} />
                </Link>
              </li>
            ))}
      </ul>

      <PaginationWithCounter //
        totalCount={data?.totalCount || 0}
        page={page}
        setPage={setPage}
        pageSize={ITEMS_PER_PAGE}
      />
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
