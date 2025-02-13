'use client';

import { DEFAULT_COLORS } from '@/constants/colors';
import { cn, getColorByString } from '@/utils/helper';
import { cva, VariantProps } from 'class-variance-authority';
import Image from 'next/image';
import { HTMLAttributes, useState } from 'react';

/**
 * 커스터마이징 가능한 기본 공용 Avatar 컴포넌트입니다.
 *
 * ### Variants:
 * - `size`:
 *   - `default`: width:38px, font-size:16px;
 *   - `md`: width:34px, font-size:16px;
 *   - `sm`: width:24px, font-size:12px;
 *
 * ### Default Variants (기본 스타일):
 * - `size`: `default`
 *
 *
 * @example
 * <Avatar size="md" email="test@test.com" />
 *
 * 반응형으로 쓰고 싶을땐, classname을 추가하세요
 * <Avatar email="test@test.com" className='w-8 md:w-10 lg:w-12' />
 */

const avatarVariants = cva(
  //prettier-ignore
  'relative inline-flex bg-white items-center justify-center aspect-square rounded-full overflow-hidden border-2 border-white leading-none',
  {
    variants: {
      size: {
        default: 'w-[38px] text-lg',
        md: 'w-[34px] text-lg',
        sm: 'w-6 text-xs',
      },
    },

    defaultVariants: {
      size: 'default',
    },
  },
);

interface AvatarProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof avatarVariants> {
  email: string;
  profileImageUrl?: string | null | URL;
}

export default function Avatar({ email, profileImageUrl, size, className, ...props }: AvatarProps) {
  const [imgError, setImgError] = useState(false);
  const colorCode = getColorByString(email, DEFAULT_COLORS);
  const firstChar = email.charAt(0);

  const isFallback = !profileImageUrl || imgError;

  return (
    <figure className={cn(avatarVariants({ size, className }))} {...props}>
      {!isFallback ? (
        <Image src={profileImageUrl} alt={email} fill onError={() => setImgError(true)} className='object-cover' />
      ) : (
        <span className='flex aspect-square w-full items-center justify-center font-semibold uppercase text-white' style={{ backgroundColor: colorCode }}>
          {firstChar}
        </span>
      )}
    </figure>
  );
}
