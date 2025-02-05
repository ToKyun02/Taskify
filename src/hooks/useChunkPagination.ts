import { useState } from 'react';
import { chunkArray } from '@/utils/chunkArray';

/*
 * "UseChunkPagination" 커스텀 훅 사용 가이드
 * ------------------------------------------------------------
 * // 예시
 * const {
 *   currentGroups,
 *   page,
 *   canGoPrev,
 *   canGoNext,
 *   handlePrev,
 *   handleNext,
 *   totalPages,
 * } = UseChunkPagination({
 *   items: myDataArray,   // 전체 아이템 배열
 *   chunkSize: 5,         // 한 묶음에 몇 개씩 자를지
 *   maxGroupsPerPage: 3,  // 한 페이지에 묶음을 몇 개까지 보여줄지
 * });
 *
 * // 이후, currentGroups로 화면을 렌더하고,
 * // canGoPrev/canGoNext로 이전/다음 버튼 활성화 여부를 결정하며,
 * // handlePrev/handleNext로 페이지 이동을 제어
 *
 * // 만약 "한 페이지에 1묶음씩" 보이길 원하면 maxGroupsPerPage를 1로 바꾸면 됨.
 * // => 데이터가 2묶음 이상이면 다음 페이지가 생김
 * ------------------------------------------------------------
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
