'use client';

import useAlert from '@/hooks/useAlert';
import { formatDate } from '@/utils/formatDate';
import { useEffect, useState } from 'react';
import Avatar from '../ui/Avatar/Avatar';
import Button from '../ui/Button/Button';
import { Textarea } from '../ui/Field';
import useConfirm from '@/hooks/useConfirm';
import { useCommentsQuery, useDeleteComment, usePostComment, useUpdateComment } from '@/apis/comments/queries';
import { CommentForm } from '@/apis/comments/types';
import { getErrorMessage } from '@/utils/errorMessage';
import { useInView } from 'react-intersection-observer';

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

  async function handleEditComment(commentId: number, currentContent: string) {
    const newContent = prompt('댓글 수정하기', currentContent);
    if (!newContent) return;

    try {
      await updateCommentMutation.mutateAsync({ id: commentId, putCommentForm: { content: newContent } });
      alert('댓글이 수정되었습니다.');
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

      {isLoading && <div className='text-sm text-gray-50'>댓글 불러오는 중...</div>}

      {!isLoading &&
        comments.map((comment) => (
          <div key={comment.id} className='flex gap-3'>
            <div>
              <Avatar email={comment.author.nickname} size='sm' />
            </div>
            <div className='flex flex-col gap-2.5'>
              <div className='flex flex-col'>
                <div className='flex items-center gap-2'>
                  <span className='text-md font-semibold text-gray-70'>{comment.author.nickname}</span>
                  <span className='text-xs text-gray-40'>{formatDate(comment.createdAt)}</span>
                </div>
                <span className='text-md text-gray-70'>{comment.content}</span>
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
  );
}
