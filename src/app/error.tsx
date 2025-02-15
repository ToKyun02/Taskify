'use client';

import Image from 'next/image';
import React, { useEffect } from 'react';
import LogoCi from '@/assets/images/logo_ci.svg';
import LogoBi from '@/assets/images/logo_bi.svg';
import Button from '@/components/ui/Button/Button';
import Link from 'next/link';

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorProps) {
  useEffect(() => {}, [error]);

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
          <h1 className='text-3xl font-bold text-gray-70'>오류가 발생했습니다.</h1>
          <p className='mt-2 text-xs text-gray-50 sm:text-xl'>죄송합니다. 문제가 발생하여 요청을 처리할 수 없습니다.</p>
          <p className='text-xl text-gray-40'>{error.message}</p>
          <Button variant='default' size='default' onClick={reset} className='mt-4'>
            다시 시도
          </Button>
        </div>
      </div>
    </>
  );
}
