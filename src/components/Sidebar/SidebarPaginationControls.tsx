import ArrowLeft from './ArrowLeft';
import ArrowRight from './ArrowRight';

interface PaginationControlsProps {
  canGoPrev: boolean;
  canGoNext: boolean;
  handlePrev: () => void;
  handleNext: () => void;
}

export default function SidebarPaginationControls({ canGoPrev, canGoNext, handlePrev, handleNext }: PaginationControlsProps) {
  return (
    <div className='hidden md:flex'>
      <button className='flex h-10 w-10 items-center justify-center rounded-bl-[4px] rounded-tl-[4px] border border-gray-30' onClick={handlePrev}>
        <ArrowLeft disabled={!canGoPrev} />
      </button>
      <button className='flex h-10 w-10 items-center justify-center rounded-br-[4px] rounded-tr-[4px] border border-gray-30' onClick={handleNext}>
        <ArrowRight disabled={!canGoNext} />
      </button>
    </div>
  );
}
