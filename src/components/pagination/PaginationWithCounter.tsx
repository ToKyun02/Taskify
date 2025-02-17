import { Dispatch, SetStateAction } from 'react';
import PaginationControls from '@/components/pagination/PaginationControls';

interface PaginationWithCounterProps {
  totalCount: number;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  pageSize: number;
}

export default function PaginationWithCounter({ totalCount, page, setPage, pageSize }: PaginationWithCounterProps) {
  const totalPage = Math.ceil(totalCount / pageSize);
  const hasNext = page < totalPage;
  const hasPrev = page > 1;

  const handlePrev = () => {
    setPage((prev) => prev - 1);
  };
  const handleNext = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div className='flex items-center justify-end gap-4 font-normal'>
      {totalCount > 0 && (
        <span className='text-md text-gray-70'>
          {totalPage} 페이지중 {page}
        </span>
      )}
      <PaginationControls canGoPrev={hasPrev} canGoNext={hasNext} handlePrev={handlePrev} handleNext={handleNext} totalPages={totalPage} alwaysShow />
    </div>
  );
}
