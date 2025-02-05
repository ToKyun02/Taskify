import Arrow from './Arrow';

interface PaginationControlsProps {
  canGoPrev: boolean;
  canGoNext: boolean;
  handlePrev: () => void;
  handleNext: () => void;

  className?: string;
}

export default function PaginationControls({ canGoPrev, canGoNext, handlePrev, handleNext, className }: PaginationControlsProps) {
  return (
    <div className={className}>
      <button className='flex h-10 w-10 items-center justify-center rounded-bl-[4px] rounded-tl-[4px] border border-gray-30' onClick={handlePrev}>
        <Arrow direction='left' disabled={!canGoPrev} />
      </button>

      <button className='flex h-10 w-10 items-center justify-center rounded-br-[4px] rounded-tr-[4px] border border-gray-30' onClick={handleNext}>
        <Arrow direction='right' disabled={!canGoNext} />
      </button>
    </div>
  );
}
