'use client';

import { useParams } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { isEmpty } from 'es-toolkit/compat';
import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd';
import { useColumnsQuery } from '@/apis/columns/queries';
import { useMoveCard } from '@/apis/cards/queries';
import { Card, CardsResponse } from '@/apis/cards/types';
import ColumnItem from '@/components/columns/ColumnItem';
import AddColumnBtn from '@/components/columns/AddColumnBtn';

export default function ColumnList() {
  const params = useParams();
  const dashbaordId = Number(params.id);
  const { data, isLoading } = useColumnsQuery(dashbaordId);
  const { mutateAsync: moveCard } = useMoveCard();
  const queryClient = useQueryClient();

  const handleDragEnd = async (result: DropResult) => {
    if (!result.destination) return;
    const prevId = Number(result.source.droppableId);
    const columnId = Number(result.destination.droppableId);
    const cardId = Number(result.draggableId);

    if (prevId === columnId) return;

    const prevSourceColumn = queryClient.getQueryData<{ pageParams: number[]; pages: CardsResponse[] }>(['cards', prevId]);

    queryClient.setQueryData(['cards', prevId], (data: { pageParams: number[]; pages: CardsResponse[] }) => {
      const updatedPages = data.pages.map((page) => {
        return {
          ...page,
          cards: page.cards.filter((card: Card) => card.id !== cardId),
        };
      });
      return { ...data, pages: updatedPages };
    });

    queryClient.setQueryData(['cards', columnId], (data: { pageParams: number[]; pages: CardsResponse[] }) => {
      const updatedPages = data.pages.map((page) => {
        const prevCards = prevSourceColumn?.pages.flatMap((page) => page.cards);
        const cardToMove = prevCards?.find((card) => {
          return card.id === cardId;
        });
        if (cardToMove) {
          return {
            ...page,
            cards: [cardToMove, ...page.cards].sort((a, b) => {
              const dateA = new Date(a.createdAt);
              const dateB = new Date(b.createdAt);
              return dateA.getTime() - dateB.getTime();
            }),
          };
        }
        return page;
      });
      return { ...data, pages: updatedPages };
    });

    await moveCard({
      cardId,
      columnId,
      prevId,
    });
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <ul className='flex flex-col lg:flex-row'>
        {isLoading && Array.from({ length: 3 }, (_, index) => <SkeletionItem key={index} />)}

        {!isLoading && isEmpty(data?.data) ? (
          <EmptyList />
        ) : (
          data?.data.map((column) => (
            <Droppable droppableId={column.id.toString()} key={column.id}>
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  <li className='flex flex-col gap-4 border-b border-r-0 p-6 lg:min-h-[calc(100dvh-70px)] lg:border-b-0 lg:border-r'>
                    <ColumnItem column={column} />
                  </li>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))
        )}
        <AddColumnBtn dashboardId={dashbaordId} columns={data?.data} />
      </ul>
    </DragDropContext>
  );
}

export function SkeletionItem() {
  return (
    <li className='flex animate-pulse flex-col gap-4 border-b border-r-0 p-6 lg:min-h-[calc(100dvh-70px)] lg:border-b-0 lg:border-r'>
      <div className='flex h-7 items-center justify-between'>
        <div className='flex items-center gap-2'>
          <div className='h-3 w-3 rounded-full bg-gray-300' />
          <div className='h-5 w-56 rounded bg-gray-300' />
          <div className='h-6 w-6 rounded bg-gray-300' />
        </div>
        <div className='ml-4 h-5 w-5 rounded-full bg-gray-300' />
      </div>
      <div className='flex h-12 w-full items-center justify-center rounded bg-gray-200'>
        <div className='h-6 w-6 rounded bg-gray-300' />
      </div>
    </li>
  );
}

function EmptyList() {
  return (
    <li className='flex animate-pulse flex-col items-center gap-4 border-b border-r-0 p-6 lg:min-h-[calc(100dvh-70px)] lg:border-b-0 lg:border-r'>
      <p className='gray-300 w-56 text-center'>컬럼이 비어있습니다.</p>
      <div className='flex h-12 w-full items-center justify-center rounded bg-gray-200'>
        <div className='h-6 w-6 rounded bg-gray-300' />
      </div>
    </li>
  );
}
