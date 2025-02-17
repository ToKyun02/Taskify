'use client';

import { forwardRef, useEffect, useState } from 'react';
import { Modal, ModalContent, ModalFooter, ModalHandle, ModalHeader } from '@/components/ui/Modal';
import { Textarea } from '@/components/ui/Field';
import Button from '@/components/ui/Button';

interface EditCommentModalProps {
  initialContent: string;
  onSave: (content: string) => Promise<void>;
}

const EditCommentModal = forwardRef<ModalHandle, EditCommentModalProps>(({ initialContent, onSave }, ref) => {
  const [content, setContent] = useState(initialContent);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setContent(initialContent);
  }, [initialContent]);

  const handleSubmit = async () => {
    if (!content.trim()) return;
    setIsSubmitting(true);
    await onSave(content);
    if (ref && 'current' in ref) {
      ref.current?.close();
    }
    setIsSubmitting(false);
  };

  const handleCancel = () => {
    setContent(initialContent);
    (ref as React.RefObject<ModalHandle>)?.current?.close();
  };

  const isChanged = content.trim() !== initialContent.trim();

  return (
    <Modal ref={ref}>
      <ModalContent className='relative left-[-5px]'>
        <ModalHeader>댓글 수정</ModalHeader>
        <Textarea value={content} onChange={(e) => setContent(e.target.value)} autoFocus />
        <ModalFooter>
          <Button variant='outline' size='sm' onClick={handleCancel}>
            취소
          </Button>
          <Button size='sm' onClick={handleSubmit} disabled={isSubmitting || !isChanged}>
            {isSubmitting ? '저장 중...' : '저장'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
});

EditCommentModal.displayName = 'EditCommentModal';
export default EditCommentModal;
