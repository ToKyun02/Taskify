import Image from 'next/image';
import Link from 'next/link';
import LogoCi from '@/assets/images/logo_ci.png';
import { ReactNode } from 'react';

export default function Header({ children }: { children: ReactNode }) {
  return (
    <header className='flex flex-col items-center gap-[10px]'>
      <Link href={'/'} className='flex flex-col items-center gap-4'>
        <Image src={LogoCi} alt='로고 CI 이미지' width={200} height={200} className='h-24 w-24 md:h-48 md:w-48' />
        <span className='font-mont text-4xl font-bold text-violet-20 md:text-6xl'>Taskify</span>
      </Link>
      <p className='font-medium text-gray-70 md:text-xl'>{children}</p>
    </header>
  );
}
