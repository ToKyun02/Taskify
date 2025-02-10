import { PropsWithChildren } from 'react';

export function Card({ children }: PropsWithChildren) {
  return <div className='w-full rounded-lg bg-white p-6 lg:p-10'>{children}</div>;
}

export function CardTitle({ children }: PropsWithChildren) {
  return <h3 className='mb-4 flex w-full items-center justify-between text-xl font-bold text-gray-70 md:text-2xl lg:mb-8'>{children}</h3>;
}
