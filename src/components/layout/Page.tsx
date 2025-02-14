import { cn } from '@/utils/helper';
import { HTMLAttributes, PropsWithChildren } from 'react';

type PageProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>>;

export function Page({ className, children }: PageProps) {
  return <div className={cn('px-3 py-[15px] md:p-10', className)}>{children}</div>;
}

export function PageInner({ className, children }: PageProps) {
  return <div className={cn('w-full max-w-[620px]', className)}>{children}</div>;
}
