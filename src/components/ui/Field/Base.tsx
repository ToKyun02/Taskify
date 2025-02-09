import { LabelHTMLAttributes, PropsWithChildren } from 'react';

export function BaseItem({ children }: PropsWithChildren) {
  return <div className='grid gap-2'>{children}</div>;
}

export function BaseLabel({ required, children, ...props }: PropsWithChildren<LabelHTMLAttributes<HTMLLabelElement> & { required?: boolean }>) {
  return (
    <label className='inline-flex items-center gap-[2px] text-md font-medium md:text-2lg' {...props}>
      {children}
      {required && <span className='pt-[2px] text-violet-20'>*</span>}
    </label>
  );
}

export function BaseError({ children }: PropsWithChildren) {
  return <div className='text-md text-red'>{children}</div>;
}

export const baseFieldClassName = 'border h-[50px] rounded-lg w-full p-4 text-md focus-visible:outline-none md:text-lg read-only:text-gray-40';
export const baseErrorClassName = 'border-red';
