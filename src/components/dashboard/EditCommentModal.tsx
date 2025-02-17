'use client';

import { forwardRef, useEffect, useState } from 'react';
import { Modal, ModalContent, ModalFooter, ModalHandle, ModalHeader } from '../ui/Modal/Modal';
import { Textarea } from '../ui/Field';
import Button from '../ui/Button/Button';

interface EditCommentModalProps {
  initialContent: string;
  onSave: (content: string) => Promise<void>;
}

const EditCommentModal = forwardRef<ModalHandle, EditCommentModalProps>(({ initialContent, onSave }, ref) => {
  const [content, setContent] = useState(initialContent);

  useEffect(() => {
    setContent(initialContent);
  }, [initialContent]);

  const handleSubmit = async () => {
    await onSave(content);
    if (ref && 'current' in ref) {
      ref.current?.close();
    }
  };

  return (
    <Modal ref={ref}>
      <ModalContent className='relative left-[-5px]'>
        <ModalHeader>댓글 수정</ModalHeader>
        <Textarea value={content} onChange={(e) => setContent(e.target.value)} autoFocus />
        <ModalFooter>
          <Button variant='outline' size='sm' onClick={() => (ref as React.RefObject<ModalHandle>)?.current?.close()}>
            취소
          </Button>
          <Button size='sm' onClick={handleSubmit}>
            저장
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
});

EditCommentModal.displayName = 'EditCommentModal';
export default EditCommentModal;
