import { HTMLAttributes } from 'react';
import { cn } from '@/utils/helper';

interface NumberChipProps extends HTMLAttributes<HTMLSpanElement> {
  label: number;
  max?: number;
}

const DEFAULT_MAX_NUMBER = 99;

export default function NumberChip({ label, max = DEFAULT_MAX_NUMBER, className, ...props }: NumberChipProps) {
  const safeParseMaxNumber = max <= 0 || !Number.isInteger(max) ? DEFAULT_MAX_NUMBER : max;

  return (
    <span className={cn('inline-flex h-5 min-w-5 items-center justify-center whitespace-nowrap rounded bg-gray-20 px-1 text-xs leading-none text-gray-50', className)} {...props}>
      {label > safeParseMaxNumber ? `${safeParseMaxNumber}+` : label}
    </span>
  );
}
