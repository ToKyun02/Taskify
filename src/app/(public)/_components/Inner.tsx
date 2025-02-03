import { PropsWithChildren } from 'react';

export function RootInner({ children, className }: PropsWithChildren<{ className?: string }>) {
  return <div className={`mx-auto max-w-[120rem] px-6 text-xs md:px-10 lg:px-20 ${className}`}>{children}</div>;
}

export function MainInner({ children, className }: PropsWithChildren<{ className?: string }>) {
  return <main className={`mx-auto max-w-[85rem] px-4 md:px-10 lg:px-20 ${className}`}>{children}</main>;
}
