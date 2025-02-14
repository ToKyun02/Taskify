'use client';

import { Column } from '@/apis/columns/types';
import ColumnSettingBtn from './ColumnSettingBtn';
import Dot from '@/components/ui/Dot/Dot';
import DashboardButton from '@/components/ui/Button/DashboardButton';
import { useCardsQuery } from '@/apis/cards/queries';
import { useInView } from 'react-intersection-observer';
import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import TodoCard from '../dashboard/TodoCard';
import { ModalHandle } from '../ui/Modal/Modal';
import CreateCard from './CreateCard';

const PAGE_SIZE = 5;

interface ColumnItemProps {
  column: Column;
}

export default function ColumnItem({ column }: ColumnItemProps) {
  const { data, fetchNextPage, hasNextPage, isFetching } = useCardsQuery({ size: PAGE_SIZE, columnId: column.id });
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
        <AnimatePresence>
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              layout
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{
                opacity: { duration: 1 },
                y: { delay: index * 0.5 },
              }}
            >
              <TodoCard card={card} />
            </motion.div>
          ))}
        </AnimatePresence>
        {isFetching && Array.from({ length: PAGE_SIZE }, (_, i) => <SkeletonCard key={i} />)}
        <div className='h-2' ref={ref} />
      </div>
      <CreateCard dashboardId={column.dashboardId} columnId={column.id} ref={addRef} />
    </>
  );
}

function Title({ column, cardCount }: { column: Column; cardCount: number }) {
  return (
    <div className='flex h-7 justify-between'>
      <div className='flex items-center gap-4'>
        <Dot color='#760DDE' />
        <span className='text-2lg font-bold text-gray-70'>{column.title}</span>
        <span className='rounded-[4px] bg-gray-20 px-2 py-0.5 text-xs font-medium text-gray-50'>{cardCount}</span>
      </div>
      <ColumnSettingBtn column={column} />
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
