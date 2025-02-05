import Arrow from './Arrow';

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
      <button className='flex h-10 w-10 items-center justify-center rounded-bl-[4px] rounded-tl-[4px] border border-gray-30' onClick={handlePrev}>
        <Arrow direction='left' disabled={!canGoPrev} />
      </button>

      <button className='flex h-10 w-10 items-center justify-center rounded-br-[4px] rounded-tr-[4px] border border-gray-30' onClick={handleNext}>
        <Arrow direction='right' disabled={!canGoNext} />
      </button>
    </div>
  );
}
