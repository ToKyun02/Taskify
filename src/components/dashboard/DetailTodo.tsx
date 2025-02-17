'use client';

import { forwardRef, useEffect, useRef, useState } from 'react';
import { Modal, ModalContent, ModalFooter, ModalHandle, ModalHeader } from '../ui/Modal/Modal';
import { motion } from 'motion/react';
import useAlert from '@/hooks/useAlert';
import { Card } from '@/apis/cards/types';
import CommentSection from './CommentSection';
import useConfirm from '@/hooks/useConfirm';
import Image from 'next/image';
import Avatar from '../ui/Avatar/Avatar';
import TagChip from '../ui/Chip/TagChip';
import x_img from '@/assets/icons/x.svg';
import kebob from '@/assets/icons/kebab.svg';
import RoundChip from '../ui/Chip/RoundChip';
import { getErrorMessage } from '@/utils/errorMessage';
import { formatDate } from '@/utils/formatDate';
import { useColumnsQuery } from '@/apis/columns/queries';
import { useRemoveCard } from '@/apis/cards/queries';
import { DEFAULT_CARD_IMAGE_URL } from '@/constants/paths';

interface DetailTodoProps {
  card: Card;
  onEdit: () => void;
}

const DetailTodo = forwardRef<ModalHandle, DetailTodoProps>(({ card, onEdit }, ref) => {
  const alert = useAlert();
  const confirm = useConfirm();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { mutateAsync: remove } = useRemoveCard();

  const formattedDueDate = formatDate(card.dueDate);

  const { data: columnsData } = useColumnsQuery(card.dashboardId);
  const columns = columnsData?.data ?? [];
  const foundColumn = columns.find((col) => col.id === card.columnId);

  const menuRef = useRef<HTMLUListElement | null>(null);

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

  const handleXClick = () => {
    if (ref && 'current' in ref) {
      ref.current?.close();
    }
  };

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <Modal ref={ref}>
      <ModalContent>
        <ModalHeader className='relative flex justify-end'>
          <div className='flex'>
            <button className='flex h-8 w-8 items-center justify-center rounded-sm hover:bg-gray-10' onClick={() => setIsDropdownOpen((prev) => !prev)}>
              <Image src={kebob} width={3} height={24} alt='메뉴' className='cursor-pointer' />
            </button>

            <button className='flex h-8 w-8 items-center justify-center rounded-sm hover:bg-gray-10' onClick={handleXClick}>
              <Image src={x_img} width={24} height={24} alt='나가기' className='cursor-pointer' />
            </button>
          </div>
          {isDropdownOpen && (
            <motion.ul
              ref={menuRef}
              initial={{ scale: 0.8, y: -20 }}
              animate={{ scale: 1, y: 0 }}
              className='absolute right-0 top-[calc(100%+6px)] z-10 w-28 rounded-md border border-gray-30 bg-white p-[4px] font-normal'
            >
              <li>
                <button
                  onClick={() => {
                    setIsDropdownOpen(false);
                    handleEditCard();
                  }}
                  className='flex h-10 w-full items-center justify-center rounded-md text-md hover:bg-violet-10 hover:font-medium hover:text-violet-20'
                >
                  수정하기
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setIsDropdownOpen(false);
                    handleDeleteCard();
                  }}
                  className='flex h-10 w-full items-center justify-center rounded-md text-md hover:bg-violet-10 hover:font-medium hover:text-violet-20'
                >
                  삭제하기
                </button>
              </li>
            </motion.ul>
          )}
        </ModalHeader>
        <div className='flex flex-col gap-8 md:flex-row md:items-start'>
          <div className='flex flex-1 flex-col gap-4'>
            <div className='flex flex-col gap-4'>
              <div className='flex flex-col gap-2 break-all text-xl font-bold text-gray-70'>{card.title}</div>

              <div className='md:hidden'>
                <div className='flex h-[64px] w-[295px] justify-between rounded-lg border border-gray-30 px-4 py-1.5'>
                  <div className='flex flex-col justify-between'>
                    <span className='text-xs font-semibold text-black'>담당자</span>
                    <div className='flex items-center gap-2'>
                      <Avatar email={card.assignee.nickname} size='sm' />
                      <span className='text-xs text-gray-70'>{card.assignee.nickname}</span>
                    </div>
                  </div>
                  <div className='flex flex-col justify-between'>
                    <span className='text-xs font-semibold text-black'>마감일</span>
                    <span className='text-xs text-gray-70'>{formattedDueDate}</span>
                  </div>
                </div>
              </div>

              <div className='flex gap-3'>
                <RoundChip label={foundColumn?.title || ''} className='' />
                <div className='mt-1.5 h-5 w-[1px] bg-gray-30'></div>
                <div className='flex flex-1 flex-wrap gap-1.5 pt-[2px]'>
                  {card.tags.map((tag) => (
                    <TagChip key={tag} label={tag} />
                  ))}
                </div>
              </div>
            </div>

            <span className='break-all text-md'>{card.description}</span>

            {card.imageUrl !== DEFAULT_CARD_IMAGE_URL && <Image src={card.imageUrl} width={400} height={200} alt={card.title} className='object-cover' />}
          </div>

          <aside className='hidden w-[181px] flex-shrink-0 md:block'>
            <div className='flex h-full w-full flex-col gap-4 rounded-lg border border-gray-30 px-4 py-1.5'>
              <div className='flex flex-col justify-between'>
                <span className='text-xs font-semibold text-black'>담당자</span>
                <div className='flex items-center gap-2'>
                  <Avatar email={card.assignee.nickname} size='sm' profileImageUrl={card.assignee.profileImageUrl?.toString() ?? null} />
                  <span className='text-xs text-gray-70'>{card.assignee.nickname}</span>
                </div>
              </div>
              <div className='flex flex-col justify-between'>
                <span className='text-xs font-semibold text-black'>마감일</span>
                <span className='text-xs text-gray-70'>{formattedDueDate}</span>
              </div>
            </div>
          </aside>
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
