import Image from 'next/image';
import { formatDate } from '@/utils/formatDate';
import Avatar from '../ui/Avatar/Avatar';
import TagChip from '../ui/Chip/TagChip';
import calendar from '@/assets/icons/calendar.svg';
import card_img from '@/assets/images/card_image1.svg';

export default function TodoCard() {
  const date = formatDate('2025-02-10');

  return (
    <div className='flex w-full flex-col gap-1 rounded-md border border-gray-30 bg-white px-3 py-[5px]'>
      <Image src={card_img} alt='할일 이미지' className='w-full' />
      <div className='flex flex-col gap-1.5'>
        <div className='flex flex-col gap-1.5'>
          <span className='text-md font-medium text-gray-70'>새로운 일정 관리 Taskify</span>
          <div className='flex gap-1.5'>
            <TagChip label='프로젝트' />
            <TagChip label='일반' />
          </div>
        </div>
        <div className='flex justify-between'>
          <div className='flex items-center gap-1'>
            <Image src={calendar} width={10} height={11} alt='캘린더' />
            <span className='text-xs font-medium text-gray-50'>{date}</span>
          </div>
          <Avatar email='aaaa@naver.com' size='sm' />
        </div>
      </div>
    </div>
  );
}
