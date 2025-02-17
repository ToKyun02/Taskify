'use client';

import useAlert from '@/hooks/useAlert';
import { formatDate } from '@/utils/formatDate';
import { useEffect, useRef, useState } from 'react';
import Avatar from '../ui/Avatar/Avatar';
import Button from '../ui/Button/Button';
import { Textarea } from '../ui/Field';
import useConfirm from '@/hooks/useConfirm';
import { useCommentsQuery, useDeleteComment, usePostComment, useUpdateComment } from '@/apis/comments/queries';
import { CommentForm } from '@/apis/comments/types';
import { getErrorMessage } from '@/utils/errorMessage';
import { useInView } from 'react-intersection-observer';
import { ModalHandle } from '../ui/Modal/Modal';
import EditCommentModal from './EditCommentModal';

interface CommentSectionProps {
  cardId: number;
  columnId: number;
  dashboardId: number;
}

const PAGE_SIZE = 10;

export default function CommentSection({ cardId, columnId, dashboardId }: CommentSectionProps) {
  const alert = useAlert();
  const confirm = useConfirm();
  const [content, setContent] = useState('');

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useCommentsQuery({ cardId, size: PAGE_SIZE });
  const comments = data?.pages.flatMap((page) => page.comments) ?? [];
  const postCommentMutation = usePostComment();
  const updateCommentMutation = useUpdateComment(cardId);
  const deleteCommentMutation = useDeleteComment(cardId);

  const editModalRef = useRef<ModalHandle>(null);
  const [editingComment, setEditingComment] = useState<{ id: number; content: string } | null>(null);

  const handleEditComment = (commentId: number, currentContent: string) => {
    setEditingComment({ id: commentId, content: currentContent });
    editModalRef.current?.open();
  };

  const handleSaveComment = async (newContent: string) => {
    if (!editingComment) return;

    if (newContent.trim() === editingComment.content.trim()) {
      return;
    }

    try {
      await updateCommentMutation.mutateAsync({
        id: editingComment.id,
        putCommentForm: { content: newContent },
      });
      alert('댓글이 수정되었습니다.');
    } catch (err) {
      alert(getErrorMessage(err));
    }
  };

  async function handleSubmitComment() {
    if (!content.trim()) return;
    const formData: CommentForm = {
      content,
      cardId,
      columnId,
      dashboardId,
    };

    try {
      await postCommentMutation.mutateAsync(formData);
      setContent('');
      alert('댓글이 작성되었습니다');
    } catch (err) {
      alert(getErrorMessage(err));
    }
  }

  async function handleDeleteComment(commentId: number) {
    const userConfirmed = await confirm('이 댓글을 삭제하시겠습니까?', {
      buttons: { ok: '삭제', cancel: '취소' },
    });
    if (!userConfirmed) return;

    try {
      await deleteCommentMutation.mutateAsync(commentId);
      alert('댓글이 삭제되었습니다.');
    } catch (err) {
      alert(getErrorMessage(err));
    }
  }

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className='flex flex-col gap-4'>
      {/* [1] 댓글 입력 영역 */}
      <div className='relative'>
        <Textarea label='댓글' value={content} onChange={(e) => setContent(e.target.value)} />
        <Button variant='outline' size='sm' className='absolute bottom-2 right-2' onClick={handleSubmitComment}>
          입력
        </Button>
      </div>

      <EditCommentModal ref={editModalRef} initialContent={editingComment?.content || ''} onSave={handleSaveComment} />

      <div className='max-h-[155px] overflow-y-auto'>
        {isLoading
          ? Array.from({ length: 3 }).map((_, idx) => <Skeleton key={idx} />)
          : comments.map((comment) => (
              <div key={comment.id} className='flex gap-3'>
                <div>
                  <Avatar email={comment.author.nickname} size='sm' />
                </div>
                <div className='flex flex-col gap-2.5'>
                  <div className='flex flex-col'>
                    <div className='flex items-center gap-2'>
                      <span className='text-md font-semibold text-gray-70'>{comment.author.nickname}</span>
                      <span className='h-4 text-xs text-gray-40'>{formatDate(comment.createdAt)}</span>
                    </div>
                    <span className='break-all text-md text-gray-70'>{comment.content}</span>
                  </div>
                  <div className='flex cursor-pointer gap-3 text-xs text-gray-40 underline'>
                    <span onClick={() => handleEditComment(comment.id, comment.content)}>수정</span>
                    <span onClick={() => handleDeleteComment(comment.id)}>삭제</span>
                  </div>
                </div>
              </div>
            ))}
        <div ref={ref} className='h-1'></div>
      </div>
    </div>
  );
}

function Skeleton() {
  return (
    <div className='flex gap-3 py-2'>
      <div className='h-8 w-8 shrink-0 rounded-full bg-gray-20' />
      <div className='flex flex-1 flex-col gap-2'>
        <div className='flex items-center gap-2'>
          <div className='h-4 w-16 rounded bg-gray-20' />
          <div className='h-3 w-20 rounded bg-gray-20' />
        </div>
        <div className='h-4 w-[90%] rounded bg-gray-20' />
        <div className='flex gap-3'>
          <div className='h-3 w-8 rounded bg-gray-20' />
          <div className='h-3 w-8 rounded bg-gray-20' />
        </div>
      </div>
    </div>
  );
}
