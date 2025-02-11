'use client';

import { useColumnsQuery } from '@/apis/columns/queries';
import { useParams } from 'next/navigation';
import ColumnItem from './ColumnItem';

export default function ColumnList() {
  const params = useParams();
  const { data, isLoading } = useColumnsQuery(Number(params.id));

  return (
    <ul className='flex flex-col lg:flex-row'>
      {isLoading && Array.from({ length: 5 }, (_, index) => <SkeletionItem key={index} />)}
      {data?.data.map((column) => (
        <li key={column.id} className='flex flex-col gap-4 border-b border-r-0 p-6 lg:min-h-[calc(100dvh-70px)] lg:border-b-0 lg:border-r'>
          <ColumnItem column={column} />
        </li>
      ))}
    </ul>
  );
}

export function SkeletionItem() {
  return <p>로딩 중</p>;
}
