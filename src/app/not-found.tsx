'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import NotFoundImg from '@/assets/images/not_found_img.png';
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
      <header className='ml-[20px] mt-[20px] w-full'>
        <Link href='/'>
          <div className='flex items-center'>
            <Image src={LogoCi} alt='로고 이미지' />
            <Image src={LogoBi} alt='로고 텍스트' />
          </div>
        </Link>
      </header>
      <div className='mt-[100px] flex w-screen flex-col items-center justify-center'>
        <Image src={NotFoundImg} alt='not-found 이미지' className='w-[350px]' />
        <h1 className='mt-4 text-3xl text-gray-70'>404 ERROR</h1>
        <p className='mt-2 text-xl text-gray-50'>존재하지 않는 페이지입니다.</p>
        <Button variant='default' size='default' onClick={handleGoHome} className='mt-4'>
          돌아가기
        </Button>
      </div>
    </>
  );
}
