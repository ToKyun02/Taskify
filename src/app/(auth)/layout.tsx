'use client';

import useAuthStore from '@/stores/authStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const { accessToken } = useAuthStore();
  useEffect(() => {
    if (accessToken) router.push('/mydashboard');
  }, [router, accessToken]);
  return <div className='mx-3 flex min-h-dvh flex-col items-center justify-center gap-9 bg-gray-10'>{children}</div>;
}
