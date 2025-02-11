'use client';

import { useColumnsQuery } from '@/apis/columns/queries';
import { useParams } from 'next/navigation';
import ColumnItem from './ColumnItem';

export default function ColumnList() {
  const params = useParams();
  const { data, isLoading } = useColumnsQuery(Number(params.id));

  return (
    <div>
      <ul>
        {isLoading && Array.from({ length: 5 }, (_, index) => <SkeletionItem key={index} />)}
        {data?.data.map((column) => (
          <li key={column.id}>
            <ColumnItem column={column} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SkeletionItem() {
  return <p>로딩 중</p>;
}
