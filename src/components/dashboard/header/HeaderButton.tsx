import { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import Link, { LinkProps } from 'next/link';
import { cn } from '@/utils/helper';

interface HeaderButtonProps extends PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> {
  href?: string;
  linkProps?: Omit<LinkProps, 'href'>; // href를 제외한 Link의 props 추가로 전달
}

export default function HeaderButton({ children, className, href, linkProps, ...props }: HeaderButtonProps) {
  const button = (
    <button
      {...props}
      className={cn(
        'flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-gray-30 bg-white px-4 py-[6px] font-medium leading-none text-gray-50 transition-all hover:text-gray-70 hover:shadow',
        className,
      )}
    >
      {children}
    </button>
  );

  if (href) {
    return (
      <Link href={href} {...linkProps}>
        {button}
      </Link>
    );
  }

  return button;
}
