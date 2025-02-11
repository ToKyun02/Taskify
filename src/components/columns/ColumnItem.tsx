import { Column } from '@/apis/columns/types';
import Dot from '../ui/Dot/Dot';
import ColumnSettingBtn from './ColumnSettingBtn';

interface ColumnItemProps {
  column: Column;
}

//TODO: 할 일 카드 리스트 구현 예정
export default function ColumnItem({ column }: ColumnItemProps) {
  return (
    <div>
      <Title column={column} />
    </div>
  );
}

function Title({ column }: { column: Column }) {
  return (
    <div className='flex justify-between'>
      <div className='flex items-center gap-4'>
        <Dot color='#760DDE' />
        <span className='text-2lg font-bold text-gray-70'>{column.title}</span>
        <span className='rounded-[4px] bg-gray-20 px-2 py-0.5 text-xs font-medium text-gray-50'>1</span>
      </div>
      <ColumnSettingBtn column={column} />
    </div>
  );
}
