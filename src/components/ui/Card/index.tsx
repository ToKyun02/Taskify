import { PropsWithChildren } from 'react';

export function Card({ children }: PropsWithChildren) {
  return <div className='w-full rounded-lg bg-white p-6 lg:p-10'>{children}</div>;
}

export function CardTitle({ children }: PropsWithChildren) {
  return <h3 className='mb-4 flex w-full items-center justify-between text-xl font-bold text-gray-70 md:text-2xl lg:mb-8'>{children}</h3>;
}

export function CardSkeleton({ count }: { count: number }) {
  return [...Array(count)].map((_, index) => (
    <Card key={index}>
      <div className='mb-8 h-5 w-[30%] animate-pulse bg-gray-200' />
      <div className='mb-4 h-5 w-full animate-pulse bg-gray-200' />
      <div className='mb-14 h-5 w-full animate-pulse bg-gray-200' />
      <div className='h-[42px] w-full animate-pulse bg-gray-200' />
    </Card>
  ));
}
