import Image from 'next/image';
import plusIcon from '@/assets/icons/plus.svg';

export default function AddTodoButton() {
  return (
    <button className='flex h-8 w-full items-center justify-center rounded-md border border-gray-30 bg-white hover:shadow-md md:h-10 lg:w-[314px]'>
      <span className='flex h-5 w-5 items-center justify-center rounded-sm bg-violet-10'>
        <Image src={plusIcon} className='h-auto w-[10px]' alt='새로운 대시보드 만들기' />
      </span>
    </button>
  );
}
