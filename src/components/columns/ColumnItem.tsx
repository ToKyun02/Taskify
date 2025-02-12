import { Column } from '@/apis/columns/types';
import ColumnSettingBtn from './ColumnSettingBtn';
import Dot from '@/components/ui/Dot/Dot';
import DashboardButton from '@/components/ui/Button/DashboardButton';

interface ColumnItemProps {
  column: Column;
}

//TODO: 할 일 카드 리스트 구현 예정
export default function ColumnItem({ column }: ColumnItemProps) {
  return (
    <>
      <Title column={column} />
      <DashboardButton variant='addTodo' />
    </>
  );
}

function Title({ column }: { column: Column }) {
  return (
    <div className='flex h-7 justify-between'>
      <div className='flex items-center gap-4'>
        <Dot color='#760DDE' />
        <span className='text-2lg font-bold text-gray-70'>{column.title}</span>
        <span className='rounded-[4px] bg-gray-20 px-2 py-0.5 text-xs font-medium text-gray-50'>1</span>
      </div>
      <ColumnSettingBtn column={column} />
    </div>
  );
}
