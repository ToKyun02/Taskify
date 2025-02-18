import { HTMLAttributes } from 'react';
import { cn, getColorByString } from '@/utils/helper';
import { DEFAULT_COLORS } from '@/constants/colors';

/**
 * 하나의 color 값으로 배경색과 폰트색상에 적용합니다.
 *
 * 받은 color가 #FFCC00일경우
 *
 * font color => #FFCCOO
 * background color => #FFCCOO30 (30% opacity)
 */

const BACKGROUND_ALPHA = 30;

interface TagChipProps extends HTMLAttributes<HTMLSpanElement> {
  label: string;
}

export default function TagChip({ label, className, ...props }: TagChipProps) {
  const colorCode = getColorByString(label, DEFAULT_COLORS);

  return (
    <span
      className={cn('inline-flex h-[26px] items-center justify-center whitespace-nowrap rounded-[4px] px-[6px] text-xs leading-none md:h-7 md:text-md', className)}
      style={{ color: colorCode, backgroundColor: `${colorCode}${BACKGROUND_ALPHA}` }}
      {...props}
    >
      {label}
    </span>
  );
}
