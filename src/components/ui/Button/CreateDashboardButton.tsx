import Image from 'next/image';
import plusIcon from '@/assets/icons/plus.svg';

interface CreateDashboardButtonProps {
  onAdd: () => void;
}

export default function CreateDashboardButton({ onAdd }: CreateDashboardButtonProps) {
  return (
    <button type='button' className='flex h-[58px] w-full items-center justify-center gap-3 rounded-md border border-gray-30 bg-white p-5 hover:shadow-md md:h-[70px]' onClick={onAdd}>
      새로운 대시보드
      <span className='flex h-5 w-5 items-center justify-center rounded-sm bg-violet-10'>
        <Image src={plusIcon} className='h-auto w-[10px]' alt='새로운 대시보드 만들기' />
      </span>
    </button>
  );
}
