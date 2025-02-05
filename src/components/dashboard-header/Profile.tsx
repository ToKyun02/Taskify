import React from 'react';

interface ProfileProps {
  nickname: string;
  profileImageUrl: string;
  onClick: () => void;
}

export default function Profile({ nickname, profileImageUrl, onClick }: ProfileProps) {
  return (
    <button onClick={onClick} className='mr-[40px] flex items-center justify-center gap-[12px] pl-[12px] sm:pl-[24px] md:pl-[32px]'>
      <span className='flex h-[34px] w-[34px] items-center justify-center rounded-full border-2 border-white bg-green-30 text-white sm:h-[38px] sm:w-[38px]'>{profileImageUrl}</span>
      <span className='hidden text-[16px] md:block'>{nickname}</span>
    </button>
  );
}
