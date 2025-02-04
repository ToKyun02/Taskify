import Image from 'next/image';
import Dot from './Dot';
import crown from '@/assets/icons/crown.svg';

interface ItemList {
  id: number;
  name: string;
  colorClass: 'green-30' | 'blue-20' | 'orange-20' | 'purple' | 'pink-20';
  hasCrown?: boolean;
}

interface SidebarItemListProps {
  currentGroups: ItemList[][];
}

export default function SidebarItemList({ currentGroups }: SidebarItemListProps) {
  return (
    <div className='flex flex-col gap-4'>
      {currentGroups.map((group, groupIndex) => (
        <div key={groupIndex} className='flex flex-col gap-2'>
          {group.map((item) => (
            <div key={item.id} className='flex justify-center gap-2.5 rounded-md p-3 md:justify-start md:hover:bg-violet-10'>
              <div className='flex items-center gap-4'>
                <Dot colorClass={item.colorClass} />

                <div className='hidden gap-1.5 md:flex'>
                  <span className='text-2lg font-medium text-gray-50'>{item.name}</span>
                  {item.hasCrown && <Image src={crown} width={17} height={14} alt='crown' />}
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
