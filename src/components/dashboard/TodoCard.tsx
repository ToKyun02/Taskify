import Image from 'next/image';
import { formatDate } from '@/utils/formatDate';
import { Card } from '@/apis/cards/types';
import Avatar from '../ui/Avatar/Avatar';
import TagChip from '../ui/Chip/TagChip';
import calendar from '@/assets/icons/calendar.svg';

interface TodoCardProps {
  card: Card;
}

export default function TodoCard({ card }: TodoCardProps) {
  const formattedDate = formatDate(card.createdAt);
  console.log(card.id);

  return (
    <div className='flex w-full flex-col gap-1 rounded-md border border-gray-30 bg-white px-3 py-[5px] md:flex-row md:gap-2.5 lg:w-[314px] lg:flex-col'>
      {card.imageUrl && <Image src={card.imageUrl} alt={card.description} className='w-full md:w-[90px] lg:w-full' width={90} height={20} />}
      <div className='flex flex-col gap-1.5 md:flex-1 md:flex-row lg:flex-col lg:gap-2'>
        <div className='flex flex-col gap-1.5 md:flex-none lg:gap-2.5'>
          <span className='text-md font-medium text-gray-70 lg:text-lg'>{card.title}</span>
          <div className='flex gap-1.5'>
            {card.tags.map((tag) => (
              <TagChip key={card.id} label={tag} />
            ))}
          </div>
        </div>
        <div className='flex justify-between md:flex-auto md:items-end'>
          <div className='flex items-center gap-1'>
            <Image src={calendar} width={10} height={11} alt='캘린더' />
            <span className='text-xs font-medium text-gray-50'>{formattedDate}</span>
          </div>
          <Avatar email={card.assignee.nickname} size='sm' />
        </div>
      </div>
    </div>
  );
}
