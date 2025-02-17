'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import LogoCi from '@/assets/images/logo_ci.svg';
import LogoBi from '@/assets/images/logo_bi.svg';
import Button from '@/components/ui/Button/Button';
import Link from 'next/link';

export default function NotFound() {
  const router = useRouter();

  const handleGoHome = () => {
    router.push('/');
  };
  return (
    <>
      <header className='fixed ml-[20px] mt-[20px] w-full'>
        <Link href='/'>
          <div className='flex items-center'>
            <Image src={LogoCi} alt='로고 이미지' />
            <Image src={LogoBi} alt='로고 텍스트' />
          </div>
        </Link>
      </header>
      <div className='flex h-screen w-full items-center justify-center'>
        <div className='flex h-fit w-screen flex-col items-center justify-center'>
          <h1 className='text-3xl font-bold text-gray-70'>404 ERROR</h1>
          <p className='mt-2 text-xl text-gray-50'>존재하지 않는 페이지입니다.</p>
          <Button variant='default' size='default' onClick={handleGoHome} className='mt-4'>
            돌아가기
          </Button>
        </div>
      </div>
    </>
  );
}
