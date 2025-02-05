import { cn } from '@/utils/helper';
import Dot from '../Sidebar/Dot';
import Image from 'next/image';
import crown from '@/assets/icons/crown.svg';
import right_arrow from '@/assets/icons/right_arrow.svg';

interface MyDashboardCardProps {
  title: string;
  color: 'green-30' | 'blue-20' | 'orange-20' | 'purple' | 'pink-20';
  createdByMe: boolean | undefined;
  variant?: 'sidebar' | 'card';
}

export default function MyDashboardCard({ title, color, createdByMe, variant }: MyDashboardCardProps) {
  const containerClass = cn(
    'flex rounded-md ',
    variant === 'sidebar' && 'justify-center gap-2.5 p-3 md:justify-start md:hover:bg-violet-10',
    variant === 'card' && 'items-center justify-between border border-gray-30 hover:shadow-md px-5 py-[22px] w-[260px] md:w-[247px] lg:w-[332px]',
  );

  const textContainerClass = cn(variant === 'sidebar' ? 'hidden md:flex gap-1.5' : 'flex gap-1.5');

  const titleClass = cn(variant === 'sidebar' && 'text-lg lg:text-2lg text-gray-50 font-medium', variant === 'card' && 'text-lg sm:text-md font-semibold text-[#333236]');
  return (
    <div className={containerClass}>
      <div className='flex items-center gap-2.5'>
        <Dot colorClass={color} />
        <div className={textContainerClass}>
          <span className={titleClass}>{title}</span>
          {createdByMe && <Image src={crown} width={17} height={14} alt='crown' />}
        </div>
      </div>
      {variant === 'card' && <Image src={right_arrow} width={7} height={13} alt='right_arrow' />}
    </div>
  );
}
