import { PropsWithChildren } from 'react';
import Image from 'next/image';
import empty from '@/assets/icons/empty.svg';

export default function MyInvitedEmptyCard({ children }: PropsWithChildren) {
  return (
    <div className='grid justify-center gap-5 px-6 py-10 text-center lg:gap-8'>
      <Image src={empty} width={60} height={60} alt='empty' className='mx-auto h-auto w-full max-w-[60px] md:max-w-[100px]' />
      <span className='text-xs text-gray-40 md:text-2lg'>{children}</span>
    </div>
  );
}
