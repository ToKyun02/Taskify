import { useState } from 'react';
import { chunkArray } from '@/utils/chunkArray';

/**
 *  chunkSize: number;           // 한 묶음에 몇 개씩?
 *  maxGroupsPerPage: number;    // 한 페이지에 묶음을 몇 개까지?
 */
interface UseChunkPaginationProps<T> {
  items: T[];
  chunkSize: number;
  maxGroupsPerPage: number;
}

export function UseChunkPagination<T>({ items, chunkSize, maxGroupsPerPage }: UseChunkPaginationProps<T>) {
  const [page, setPage] = useState(1);

  const chunkedData = chunkArray(items, chunkSize);
  const totalPages = Math.ceil(chunkedData.length / maxGroupsPerPage);

  const startIndex = (page - 1) * maxGroupsPerPage;
  const endIndex = page * maxGroupsPerPage;
  const currentGroups = chunkedData.slice(startIndex, endIndex);

  const canGoPrev = page > 1;
  const canGoNext = page < totalPages;

  const handlePrev = () => {
    if (canGoPrev) setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (canGoNext) setPage((prev) => prev + 1);
  };
  return {
    currentGroups,
    page,
    setPage,
    totalPages,
    canGoPrev,
    canGoNext,
    handlePrev,
    handleNext,
  };
}
