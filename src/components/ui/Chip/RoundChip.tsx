import { cn } from '@/utils/helper';
import { HTMLAttributes } from 'react';

interface RoundChipProps extends HTMLAttributes<HTMLSpanElement> {
  label: string;
}

export default function RoundChip({ label, className, ...props }: RoundChipProps) {
  return (
    <span
      className={cn(
        'inline-grid h-[26px] grid-flow-col items-center justify-center gap-[6px] rounded-full bg-violet-10 px-2 text-xs leading-none text-violet-20 before:h-[6px] before:w-[6px] before:rounded-full before:bg-violet-20 md:h-8 md:px-[10px] md:text-md',
        className,
      )}
      title={label}
      {...props}
    >
      <span className='truncate'>{label}</span>
    </span>
  );
}
