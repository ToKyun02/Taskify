'use client';

import { useColumnsQuery } from '@/apis/columns/queries';
import { useParams } from 'next/navigation';
import ColumnItem from './ColumnItem';
import AddColumnBtn from './AddColumnBtn';
import { isEmpty } from 'es-toolkit/compat';

export default function ColumnList() {
  const params = useParams();
  const dashbaordId = Number(params.id);
  const { data, isLoading } = useColumnsQuery(dashbaordId);

  return (
    <ul className='flex flex-col lg:flex-row'>
      {isLoading && Array.from({ length: 3 }, (_, index) => <SkeletionItem key={index} />)}

      {!isLoading && isEmpty(data?.data) ? (
        <EmptyList />
      ) : (
        data?.data.map((column) => (
          <li key={column.id} className='flex flex-col gap-4 border-b border-r-0 p-6 lg:min-h-[calc(100dvh-70px)] lg:border-b-0 lg:border-r'>
            <ColumnItem column={column} />
          </li>
        ))
      )}
      <AddColumnBtn dashboardId={dashbaordId} columns={data?.data} />
    </ul>
  );
}

export function SkeletionItem() {
  return (
    <li className='flex animate-pulse flex-col gap-4 border-b border-r-0 p-6 lg:min-h-[calc(100dvh-70px)] lg:border-b-0 lg:border-r'>
      <div className='flex h-7 items-center justify-between'>
        <div className='flex items-center gap-2'>
          <div className='h-3 w-3 rounded-full bg-gray-300' />
          <div className='h-5 w-56 rounded bg-gray-300' />
          <div className='h-6 w-6 rounded bg-gray-300' />
        </div>
        <div className='ml-4 h-5 w-5 rounded-full bg-gray-300' />
      </div>
      <div className='flex h-12 w-full items-center justify-center rounded bg-gray-200'>
        <div className='h-6 w-6 rounded bg-gray-300' />
      </div>
    </li>
  );
}

function EmptyList() {
  return (
    <li className='flex animate-pulse flex-col items-center gap-4 border-b border-r-0 p-6 lg:min-h-[calc(100dvh-70px)] lg:border-b-0 lg:border-r'>
      <p className='gray-300 w-56 text-center'>컬럼이 비어있습니다.</p>
      <div className='flex h-12 w-full items-center justify-center rounded bg-gray-200'>
        <div className='h-6 w-6 rounded bg-gray-300' />
      </div>
    </li>
  );
}
