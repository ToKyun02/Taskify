'use client';

import { forwardRef, useState } from 'react';
import { Modal, ModalContent, ModalFooter, ModalHandle, ModalHeader } from '../ui/Modal/Modal';
import { motion } from 'motion/react';
import useAlert from '@/hooks/useAlert';
import { useRouter } from 'next/navigation';
import { Card } from '@/apis/cards/types';
import { deleteCard } from '@/apis/cards';
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

interface DetailTodoProps {
  card: Card;
}

const NO_IMAGE_BASE_URL = 'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/taskify/task_image/';

const DetailTodo = forwardRef<ModalHandle, DetailTodoProps>(({ card }, ref) => {
  const alert = useAlert();
  const confirm = useConfirm();
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const formattedDueDate = formatDate(card.dueDate);

  const handleDeleteCard = async () => {
    const userConfirmed = await confirm('이 카드를 삭제하시겠습니까?', {
      buttons: {
        ok: '삭제',
        cancel: '취소',
      },
    });

    if (!userConfirmed) return; // 취소 버튼을 누르면 진행 중단
    try {
      await deleteCard(card.id);
      alert('카드가 삭제되었습니다.');
      if (ref && 'current' in ref && ref.current) {
        ref.current.close();
      }
      router.push('/dashboard');
    } catch (err) {
      const message = getErrorMessage(err);
      alert(message);
    }
  };

  const handleEditCard = () => {
    alert('수정 모달 열기');
  };

  const handleXClick = () => {
    if (ref && 'current' in ref) {
      ref.current?.close();
    }
  };

  return (
    <Modal ref={ref}>
      <ModalContent>
        <ModalHeader className='relative flex justify-end'>
          <div className='flex gap-4'>
            <Image src={kebob} width={3} height={24} alt='메뉴' className='cursor-pointer' onClick={() => setIsDropdownOpen((prev) => !prev)} />
            <Image src={x_img} width={24} height={24} alt='나가기' onClick={handleXClick} className='cursor-pointer' />
          </div>
          {isDropdownOpen && (
            <motion.ul initial={{ scale: 0.8, y: -20 }} animate={{ scale: 1, y: 0 }} className='absolute right-0 top-[calc(100%+6px)] z-10 w-28 rounded-md border border-gray-30 bg-white p-[4px]'>
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
              <div className='flex flex-col gap-2 text-xl font-bold text-gray-70'>{card.title}</div>

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

              <div className='flex items-center gap-3'>
                <RoundChip label='To Do' />
                <div className='h-5 w-[1px] bg-gray-30'></div>
                {card.tags.map((tag) => (
                  <TagChip key={tag} label={tag} />
                ))}
              </div>
            </div>

            <span className='text-md'>{card.description}</span>

            {card.imageUrl && card.imageUrl !== NO_IMAGE_BASE_URL && <Image src={card.imageUrl} width={400} height={200} alt={card.title} className='object-cover' />}
          </div>

          <aside className='hidden flex-shrink-0 md:block'>
            <div className='flex h-full w-[181px] flex-col gap-4 rounded-lg border border-gray-30 px-4 py-1.5'>
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
