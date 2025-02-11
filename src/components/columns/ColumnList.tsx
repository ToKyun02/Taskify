'use client';

import { useColumnsQuery } from '@/apis/columns/queries';
import { useParams } from 'next/navigation';
import ColumnItem from './ColumnItem';
import AddColumnBtn from './AddColumnBtn';

export default function ColumnList() {
  const params = useParams();
  const dashbaordId = Number(params.id);
  const { data, isLoading } = useColumnsQuery(dashbaordId);

  return (
    <ul className='flex flex-col lg:flex-row'>
      {isLoading && Array.from({ length: 5 }, (_, index) => <SkeletionItem key={index} />)}
      {data?.data.map((column) => (
        <li key={column.id} className='flex flex-col gap-4 border-b border-r-0 p-6 lg:min-h-[calc(100dvh-70px)] lg:border-b-0 lg:border-r'>
          <ColumnItem column={column} />
        </li>
      ))}
      <AddColumnBtn dashboardId={dashbaordId} />
    </ul>
  );
}

export function SkeletionItem() {
  return <p>로딩 중</p>;
}
