'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { Draggable } from '@hello-pangea/dnd';
import { Column } from '@/apis/columns/types';
import { useCardsQuery } from '@/apis/cards/queries';
import ColumnSettingBtn from '@/components/columns/ColumnSettingBtn';
import Dot from '@/components/ui/Dot';
import DashboardButton from '@/components/ui/Button/DashboardButton';
import TodoCard from '@/components/todo/TodoCard';
import { ModalHandle } from '@/components/ui/Modal';
import CreateCard from '@/components/columns/CreateCard';

const PAGE_SIZE = 5;

interface ColumnItemProps {
  column: Column;
}

export default function ColumnItem({ column }: ColumnItemProps) {
  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } = useCardsQuery({ size: PAGE_SIZE, columnId: column.id });
  const cards = data?.pages.flatMap((page) => page.cards) ?? [];
  const totalCount = data?.pages[0]?.totalCount ?? 0;

  const [ref, inView] = useInView();
  const addRef = useRef<ModalHandle>(null);

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <>
      <Title column={column} cardCount={totalCount} />
      <DashboardButton variant='addTodo' onClick={() => addRef.current?.open()} />
      <div className='flex flex-col gap-4'>
        {cards.map((card, index) => (
          <Draggable draggableId={card.id.toString()} index={index} key={card.id.toString()}>
            {(provided) => (
              <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                <motion.div
                  key={card.id.toString()}
                  initial={{ opacity: 1, y: 0 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{
                    opacity: { duration: 0.5 },
                    y: { delay: 1 },
                  }}
                >
                  <TodoCard card={card} />
                </motion.div>
              </div>
            )}
          </Draggable>
        ))}

        {isLoading && Array.from({ length: PAGE_SIZE }, (_, i) => <SkeletonCard key={i} />)}
        {isFetchingNextPage && Array.from({ length: PAGE_SIZE }, (_, i) => <SkeletonCard key={i} />)}
        <div className='h-2' ref={ref} />
      </div>
      <CreateCard dashboardId={column.dashboardId} columnId={column.id} ref={addRef} />
    </>
  );
}

function Title({ column, cardCount }: { column: Column; cardCount: number }) {
  return (
    <div className='flex h-7 items-center justify-between gap-4'>
      <div className='flex min-w-0 items-center gap-4'>
        <span className='flex-shrink-0'>
          <Dot color='#760DDE' />
        </span>
        <span className='overflow-hidden text-ellipsis whitespace-nowrap text-2lg font-bold text-gray-70'>{column.title}</span>
        <span className='rounded-[4px] bg-gray-20 px-2 py-0.5 text-xs font-medium text-gray-50'>{cardCount}</span>
      </div>
      <div className='flex-shrink-0'>
        <ColumnSettingBtn column={column} />
      </div>
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className='flex animate-pulse flex-col space-y-4'>
      <div className='h-20 w-full rounded-lg bg-gray-200 lg:h-52'></div>
      <div className='h-4 w-full rounded-md bg-gray-200'></div>
    </div>
  );
}
