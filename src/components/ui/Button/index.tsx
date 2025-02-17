import { ButtonHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/helper';

/**
 * 커스터마이징 가능한 기본 공용 Button 컴포넌트입니다.
 *
 * ### Variants:
 * - `variant`:
 *   - `default`: 보라색 배경과 흰색 텍스트.
 *   - `outline`: 흰색 배경과 보라색 텍스트, 회색 테두리.
 *
 * - `size`:
 *   - `default`: (PC 기준) : height:48px, font-size:16px
 *                (Mobile 기준) : height:42px, font-size:14px
 *
 *   - `sm`: (PC 기준) : height:32px, font-size:14px;
 *           (Mobile 기준) : height:32px, font-size:12px;
 *
 *           단독으로 사용 시 최소 너비 84px을 가지며,
 *           flex 컨테이너 안에서 사용되면 `flex-1`로 늘어나고, 컨테이너가 전체너비를 통해서 컨트롤.
 *
 *   - `lg`: height:48px, font-size:16px
 *
 * ### Compound Variants (조합된 스타일):
 * - `size: lg` + `variant: outline`: 텍스트 색상이 회색으로 변경.
 *
 * ### Default Variants (기본 스타일):
 * - `variant`: `default`
 * - `size`: `default`
 *
 *
 * @example
 * <Button variant="outline" size="sm">클릭</Button>
 */

const buttonVariants = cva(
  //prettier-ignore
  [
    'inline-flex items-center justify-center gap-2 flex-1',
    'whitespace-nowrap font-semibold',
    'rounded-[4px] px-4 py-2',
    'disabled:cursor-not-allowed',
  ].join(' '),
  {
    variants: {
      variant: {
        default: 'bg-violet-20 text-white disabled:bg-gray-40',
        outline: 'bg-white text-violet-20 border border-gray-30 disabled:opacity-50',
      },
      size: {
        default: 'h-[42px] text-md md:text-lg md:h-12',
        sm: 'h-8 text-xs md:text-md w-auto min-w-[84px]',
        lg: 'h-[54px] text-lg rounded-lg',
      },
    },
    compoundVariants: [
      {
        size: 'lg',
        variant: 'outline',
        className: 'text-gray-50',
      },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {}

export default function Button({ variant, size, className, ...props }: ButtonProps) {
  return <button className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}
