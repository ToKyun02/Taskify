import React from 'react';
import Image from 'next/image';
import Setting from '@/assets/icons/setting.svg';
import AddBox from '@/assets/icons/add_box.svg';

interface SettingBtnProps {
  onSettingClick: () => void;
  onInviteClick: () => void;
}

export default function SettingBtn({ onSettingClick, onInviteClick }: SettingBtnProps) {
  return (
    <div className='flex items-center gap-[6px] sm:gap-[12px] md:gap-[16px]'>
      <button
        className='flex h-[30px] w-[49px] items-center justify-center gap-[8px] rounded-[8px] border border-gray-30 text-[14px] text-gray-50 transition-transform hover:scale-105 hover:border-violet-20 hover:bg-violet-20 hover:text-white sm:h-[40px] sm:w-[88px] md:text-[16px]'
        onClick={onSettingClick}
      >
        <Image src={Setting} alt='관리 버튼' className='hidden sm:block' />
        관리
      </button>
      <button
        className='flex h-[30px] w-[73px] items-center justify-center gap-[8px] rounded-[8px] border border-gray-30 text-[14px] text-gray-50 transition-transform hover:scale-105 hover:border-violet-20 hover:bg-violet-20 hover:text-white sm:h-[40px] sm:w-[116px] md:text-[14px]'
        onClick={onInviteClick}
      >
        <Image src={AddBox} alt='초대 버튼' className='hidden sm:block' />
        초대하기
      </button>
    </div>
  );
}
