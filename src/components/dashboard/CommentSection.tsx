import { deleteComment, getComments, postComment, putComment } from '@/apis/comments';
import { Comment, CommentForm } from '@/apis/comments/types';
import useAlert from '@/hooks/useAlert';
import { formatDate } from '@/utils/formatDate';
import { useEffect, useState } from 'react';
import Avatar from '../ui/Avatar/Avatar';
import Button from '../ui/Button/Button';
import { Textarea } from '../ui/Field';
import { getErrorMessage } from '@/utils/errorMessage';

interface CommentSectionProps {
  cardId: number;
  columnId: number;
  dashboardId: number;
}

export default function CommentSection({ cardId, columnId, dashboardId }: CommentSectionProps) {
  const alert = useAlert();
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState('');

  useEffect(() => {
    fetchComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardId]);

  async function fetchComments() {
    setIsLoading(true);
    try {
      const data = await getComments({ cardId, size: 10 });
      setComments(data.comments);
    } catch (err) {
      const message = getErrorMessage(err);
      alert(message);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSubmitComment() {
    if (!content.trim()) return;
    const formData: CommentForm = {
      content,
      cardId,
      columnId,
      dashboardId,
    };
    try {
      const newComment = await postComment(formData);
      setComments((prev) => [newComment, ...prev]);
      setContent('');
    } catch (err) {
      const message = getErrorMessage(err);
      alert(message);
    }
  }

  async function handleEditComment(commentId: number, currentContent: string) {
    const newContent = prompt('댓글 수정하기', currentContent);
    if (!newContent) return;
    try {
      const updated = await putComment(commentId, { content: newContent });
      setComments((prev) => prev.map((c) => (c.id === commentId ? updated : c)));
    } catch (err) {
      const message = getErrorMessage(err);
      alert(message);
    }
  }

  async function handleDeleteComment(commentId: number) {
    if (!confirm('댓글을 삭제하시겠습니까?')) return;
    try {
      await deleteComment(commentId);
      setComments((prev) => prev.filter((c) => c.id !== commentId));
    } catch (err) {
      const message = getErrorMessage(err);
      alert(message);
    }
  }

  return (
    <div className='flex flex-col gap-4'>
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
    </div>
  );
}
