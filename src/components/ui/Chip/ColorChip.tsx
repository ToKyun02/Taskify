import { DEFAULT_COLOR } from '@/constants/colors';
import { cn } from '@/utils/helper';
import { HTMLAttributes } from 'react';

interface ColorChipProps extends HTMLAttributes<HTMLSpanElement> {
  color: DEFAULT_COLOR;
}

export default function ColorChip({ color, className, ...props }: ColorChipProps) {
  return (
    <span className={cn('inline-flex h-[30px] w-[30px] rounded-full leading-none', className)} style={{ backgroundColor: color }} {...props}>
      <span className='sr-only'>{color}</span>
    </span>
  );
}
