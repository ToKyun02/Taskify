'use client';

import { forwardRef } from 'react';
import Image from 'next/image';
import useAlert from '@/hooks/useAlert';
import useConfirm from '@/hooks/useConfirm';
import { Card } from '@/apis/cards/types';
import { useColumnsQuery } from '@/apis/columns/queries';
import { useRemoveCard } from '@/apis/cards/queries';
import { getErrorMessage } from '@/utils/network/errorMessage';
import { formatDate } from '@/utils/formatDate';
import CommentSection from '@/components/todo/CommentSection';
import { Modal, ModalContent, ModalFooter, ModalHandle, ModalHeader } from '@/components/ui/Modal';
import Avatar from '@/components/ui/Avatar';
import TagChip from '@/components/ui/Chip/TagChip';
import RoundChip from '@/components/ui/Chip/RoundChip';
import Dropdown from '@/components/ui/Dropdown';
import { DEFAULT_CARD_IMAGE_URL } from '@/constants/todo';
import x_img from '@/assets/icons/x.svg';

interface DetailTodoProps {
  card: Card;
  onEdit: () => void;
}

const DetailTodo = forwardRef<ModalHandle, DetailTodoProps>(({ card, onEdit }, ref) => {
  const { data: columnsData } = useColumnsQuery(card.dashboardId);
  const { mutateAsync: remove } = useRemoveCard();
  const columns = columnsData?.data ?? [];
  const foundColumn = columns.find((col) => col.id === card.columnId);
  const formattedDueDate = formatDate(card.dueDate);
  const alert = useAlert();
  const confirm = useConfirm();

  const handleDeleteCard = async () => {
    const userConfirmed = await confirm('이 카드를 삭제하시겠습니까?', {
      buttons: {
        ok: '삭제',
        cancel: '취소',
      },
    });

    if (!userConfirmed) return; // 취소 버튼을 누르면 진행 중단
    try {
      await remove(card.id);
      alert('카드가 삭제되었습니다.');
      if (ref && 'current' in ref && ref.current) {
        ref?.current?.close();
      }
    } catch (err) {
      const message = getErrorMessage(err);
      alert(message);
    }
  };

  const handleEditCard = () => {
    onEdit();
  };

  const handleClose = () => {
    if (ref && 'current' in ref) {
      ref.current?.close();
    }
  };

  return (
    <Modal ref={ref}>
      <ModalContent>
        <ModalHeader className='relative flex justify-end'>
          <div className='flex'>
            <Dropdown
              options={[
                {
                  value: 'modify',
                  component: (
                    <button onClick={handleEditCard} className='whitespace-nowrap font-normal'>
                      수정하기
                    </button>
                  ),
                },
                {
                  value: 'delete',
                  component: (
                    <button onClick={handleDeleteCard} className='whitespace-nowrap font-normal'>
                      삭제하기
                    </button>
                  ),
                },
              ]}
              type='kebab'
            />
            <button className='flex h-8 w-8 cursor-pointer items-center justify-center rounded-sm hover:bg-gray-10' onClick={handleClose}>
              <Image src={x_img} width={24} height={24} alt='나가기' />
            </button>
          </div>
        </ModalHeader>
        <div className='relative grid gap-6 md:pr-48'>
          <div className='break-all text-xl font-bold text-gray-70'>{card.title}</div>

          <aside className='right-0 top-0 flex flex-row gap-4 rounded-lg border border-gray-30 p-4 md:absolute md:w-44 md:flex-col'>
            <div className='grid flex-1 gap-[6px]'>
              <span className='text-xs font-semibold text-black'>담당자</span>
              <div className='flex items-center gap-2'>
                <Avatar email={card.assignee.nickname} size='sm' profileImageUrl={card.assignee.profileImageUrl?.toString() ?? null} />
                <span className='text-xs text-gray-70'>{card.assignee.nickname}</span>
              </div>
            </div>

            <div className='grid flex-1 gap-[6px]'>
              <span className='text-xs font-semibold text-black'>마감일</span>
              <span className='text-xs text-gray-70'>{formattedDueDate}</span>
            </div>
          </aside>

          <div className='flex gap-3'>
            <RoundChip label={foundColumn?.title || ''} />
            <div className='mt-1.5 h-5 w-[1px] bg-gray-30'></div>
            <div className='flex flex-1 flex-wrap gap-1.5 pt-[2px]'>
              {card.tags.map((tag) => (
                <TagChip key={tag} label={tag} />
              ))}
            </div>
          </div>

          <span className='break-all text-md'>{card.description}</span>

          {card.imageUrl !== DEFAULT_CARD_IMAGE_URL && <Image src={card.imageUrl} width={400} height={200} alt={card.title} className='object-cover' />}
        </div>

        <ModalFooter className='flex flex-col'>
          <CommentSection cardId={card.id} columnId={card.columnId} dashboardId={card.dashboardId} />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
});

DetailTodo.displayName = 'DetailTodoModal';
export default DetailTodo;
