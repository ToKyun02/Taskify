import { cn } from '@/utils/helper';
import { ARROW_PATH_LEFT, ARROW_PATH_RIGHT } from '@/constants/paths';

/*
 * direction: 'left' | 'right'
 * disabled일 경우 색상/커서 상태 변경
 */
interface ArrowProps {
  direction: 'left' | 'right';
  disabled?: boolean;
  className?: string;
}

export default function Arrow({ direction, disabled = false, className }: ArrowProps) {
  const baseStyle = 'w-4 h-4 fill-current';
  const colorStyle = disabled ? 'text-gray-30 cursor-default' : 'text-gray-50 hover:text-gray-60 cursor-pointer';

  const dValue = direction === 'left' ? ARROW_PATH_LEFT : ARROW_PATH_RIGHT;

  return (
    <svg className={cn(baseStyle, colorStyle, className)} width='10' height='16' viewBox='0 0 10 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d={dValue} fill='currentColor' />
    </svg>
  );
}
