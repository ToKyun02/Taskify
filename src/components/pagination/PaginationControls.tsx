import Arrow from '@/components/pagination/Arrow';

/*
 * "PaginationControls" 컴포넌트 사용 가이드
 * ------------------------------------------------------------
 * // 예시
 * <PaginationControls
 *   canGoPrev={canGoPrev}
 *   canGoNext={canGoNext}
 *   handlePrev={handlePrev}
 *   handleNext={handleNext}
 *   totalPages={totalPages}
 *   alwaysShow={false}         // 1페이지 이하일 때 버튼을 숨길지 (기본값 false)
 *   className='hidden md:flex' // 모바일 숨기고 md부터 보이도록 (선택)
 * />
 *
 * - canGoPrev, canGoNext: "이전/다음 버튼" 활성/비활성 제어
 * - handlePrev, handleNext: 클릭 시 실제 페이지 이동 처리 함수
 * - totalPages: 총 페이지 수
 * - alwaysShow: true면 totalPages<=1이어도 버튼을 무조건 렌더(비활성).
 * - className: display나 여백, 반응형 등을 제어하기 위해 부모가 원하는 클래스를 덧붙일 수 있음.
 * ------------------------------------------------------------
 */
interface PaginationControlsProps {
  canGoPrev: boolean;
  canGoNext: boolean;
  handlePrev: () => void;
  handleNext: () => void;
  totalPages: number;
  alwaysShow?: boolean;
  className?: string;
}

export default function PaginationControls({ canGoPrev, canGoNext, handlePrev, handleNext, totalPages, alwaysShow = false, className }: PaginationControlsProps) {
  if (!alwaysShow && totalPages <= 1) {
    return null;
  }

  return (
    <div className={`flex ${className} `}>
      <button className='flex h-10 w-10 items-center justify-center rounded-bl-[4px] rounded-tl-[4px] border border-gray-30' onClick={handlePrev} disabled={!canGoPrev}>
        <Arrow direction='left' disabled={!canGoPrev} />
      </button>

      <button className='flex h-10 w-10 items-center justify-center rounded-br-[4px] rounded-tr-[4px] border border-gray-30' onClick={handleNext} disabled={!canGoNext}>
        <Arrow direction='right' disabled={!canGoNext} />
      </button>
    </div>
  );
}
