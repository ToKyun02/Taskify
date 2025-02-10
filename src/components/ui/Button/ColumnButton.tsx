import Image from 'next/image';
import plusIcon from '@/assets/icons/plus.svg';

export default function ColumnButton() {
  return (
    <button className='flex h-[66px] w-full items-center justify-center gap-3 rounded-lg border border-gray-30 bg-white text-lg font-bold text-gray-70 hover:shadow-md md:h-[70px] md:text-2lg lg:w-[354px]'>
      새로운 컬럼 추가하기
      <span className='flex h-5 w-5 items-center justify-center rounded-sm bg-violet-10'>
        <Image src={plusIcon} className='h-auto w-[10px]' alt='새로운 대시보드 만들기' />
      </span>
    </button>
  );
}
