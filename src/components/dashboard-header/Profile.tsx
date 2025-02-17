'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { useGetUser } from '@/apis/users/queries';
import Avatar from '@/components/ui/Avatar/Avatar';
import useAlert from '@/hooks/useAlert';
import { useLogout } from '@/apis/auth/queries';

export default function Profile() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data, isFetching } = useGetUser();
  const alert = useAlert();
  const menuRef = useRef<HTMLDivElement | null>(null);
  const { mutateAsync: logout } = useLogout();

  const handleLogout = async () => {
    await logout();
    await alert('로그아웃 했습니다.');
    window.location.reload();
  };

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      {isFetching ? (
        <Skeleton />
      ) : (
        data && (
          <div ref={menuRef} className='group relative flex cursor-pointer items-center gap-3 leading-none' onClick={() => setIsMenuOpen((prev) => !prev)}>
            <Avatar email={data.email} profileImageUrl={data.profileImageUrl} className='transition-shadow group-hover:shadow-sm group-hover:shadow-slate-400' />
            <span className='hidden font-medium md:block'>{data.nickname}</span>

            {isMenuOpen && (
              <motion.ul //
                initial={{ scale: 0.8, y: -20 }}
                animate={{ scale: 1, y: 0 }}
                className='absolute right-0 top-[calc(100%+6px)] w-28 rounded-md border border-gray-30 bg-white p-[4px]'
              >
                <li>
                  <Link href='/mypage' className='flex h-10 w-full items-center justify-center rounded-md text-md hover:bg-violet-10 hover:font-medium hover:text-violet-20'>
                    내정보
                  </Link>
                </li>
                <li>
                  <button className='flex h-10 w-full items-center justify-center text-md hover:bg-violet-10 hover:font-medium hover:text-violet-20' onClick={handleLogout}>
                    로그아웃
                  </button>
                </li>
              </motion.ul>
            )}
          </div>
        )
      )}
    </>
  );
}

function Skeleton() {
  return (
    <div className='flex items-center gap-3 leading-none'>
      <div className='flex aspect-square w-9 animate-pulse rounded-full bg-gray-20' />
      <span className='block h-4 w-16 animate-pulse rounded-md bg-gray-20' />
    </div>
  );
}
