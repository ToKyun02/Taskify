'use client';

import Image from 'next/image';
import { formatDate } from '@/utils/formatDate';
import { Card } from '@/apis/cards/types';
import Avatar from '../ui/Avatar/Avatar';
import TagChip from '../ui/Chip/TagChip';
import calendar from '@/assets/icons/calendar.svg';
import { useRef } from 'react';
import { ModalHandle } from '../ui/Modal/Modal';
import DetailTodo from '@/components/dashboard/DetailTodo';
import TodoEditModal from './TodoEditModal';
import { DEFAULT_CARD_IMAGE_URL } from '@/constants/paths';

interface TodoCardProps {
  card: Card;
}

export default function TodoCard({ card }: TodoCardProps) {
  const detailTodoModalRef = useRef<ModalHandle>(null);
  const editModalRef = useRef<ModalHandle>(null);
  const formattedDate = formatDate(card.dueDate);

  const handleOpenEditModal = () => {
    detailTodoModalRef.current?.close();
    editModalRef.current?.open();
  };

  return (
    <>
      <div
        className='flex w-full cursor-pointer flex-col gap-1 rounded-md border border-gray-30 bg-white p-4 md:flex-row md:gap-2.5 lg:w-[314px] lg:flex-col'
        onClick={() => detailTodoModalRef.current?.open()}
      >
        {card.imageUrl !== DEFAULT_CARD_IMAGE_URL && <Image src={card.imageUrl} alt={card.title} className='w-full md:w-[120px] lg:w-full' width={400} height={200} />}
        <div className='flex flex-col gap-1.5 md:flex-1 md:flex-row lg:flex-col lg:gap-2'>
          <div className='flex flex-col gap-1.5 md:flex-none lg:gap-2.5'>
            <span className='break-words break-all text-md font-medium text-gray-70 lg:text-lg lg:leading-5'>{card.title}</span>
            <div className='flex flex-wrap gap-1.5 break-words'>
              {card.tags.map((tag) => (
                <TagChip key={tag} label={tag} />
              ))}
            </div>
          </div>
          <div className='flex justify-between md:flex-auto md:items-end'>
            <div className='flex items-center gap-1'>
              <Image src={calendar} width={10} height={11} alt='캘린더' />
              <span className='text-xs font-medium text-gray-50'>{formattedDate}</span>
            </div>
            <Avatar email={card.assignee.nickname} size='sm' profileImageUrl={card.assignee.profileImageUrl} />
          </div>
        </div>
      </div>

      <DetailTodo ref={detailTodoModalRef} card={card} onEdit={handleOpenEditModal} />
      <TodoEditModal ref={editModalRef} card={card} />
    </>
  );
}
