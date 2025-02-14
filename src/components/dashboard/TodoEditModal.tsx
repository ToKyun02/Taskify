import { forwardRef, useState } from 'react';
import { Modal, ModalContent, ModalFooter, ModalHandle, ModalHeader } from '../ui/Modal/Modal';
import { Card } from '@/apis/cards/types';
import { AssignInput, DateInput, ImageUpload, TagInput } from '../ui/Field';
import { useColumnsQuery } from '@/apis/columns/queries';
import StatusDropdown from '../ui/Dropdown/StatusDropdown';
import { Textarea } from '../ui/Field';
import Button from '../ui/Button/Button';

interface TodoEditModalProps {
  card: Card;
}

const TodoEditModal = forwardRef<ModalHandle, TodoEditModalProps>(({ card }, ref) => {
  const { data } = useColumnsQuery(card.dashboardId);
  const columns = data?.data ?? [];

  const [dueDate, setDueDate] = useState<Date | null>(card.dueDate ? new Date(card.dueDate) : null);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [assignId, setAssignId] = useState<number>(card.assignee?.id || 0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const defaultColumn = columns.find((c) => c.id === card.columnId);
  const [selectedColumn, setSelectedColumn] = useState(defaultColumn);

  const [tags, setTags] = useState<string[]>(card.tags || []);

  const [imageValue, setImageValue] = useState<File | string | null>(card.imageUrl || null);

  const handleImageChange = (file: File | null | undefined) => {
    setImageValue(file ?? null);
  };

  const handleStatusChange = (columnId: number) => {
    const newColumn = columns.find((c) => c.id === columnId);
    if (newColumn) {
      setSelectedColumn(newColumn);
    }
    setIsDropdownOpen(false);
  };

  return (
    <Modal ref={ref}>
      <ModalContent>
        <ModalHeader>
          <h3 className='text-lg font-bold text-gray-70'>할 일 수정</h3>
        </ModalHeader>
        <form>
          <div className='flex flex-col gap-8'>
            <div className='flex flex-col gap-8 md:flex-row'>
              <StatusDropdown columns={columns} selectedColumn={selectedColumn} onChange={handleStatusChange} />
              <AssignInput label='담당자' value={card.assignee.id} onChange={(id) => setAssignId(id)} />
            </div>
            <Textarea label='설명' />
            <DateInput label='마감일' value={dueDate ?? new Date()} onChange={(newValue) => setDueDate(newValue)} placeholder='마감일을 설정해주세요' />
            <TagInput label='태그' value={tags} onChange={(newTags) => setTags(newTags)} placeholder='태그를 입력 후 엔터를 누르세요' />

            <ImageUpload label='이미지' defaultValue={card.imageUrl ?? ''} value={imageValue} onChange={handleImageChange} onBlur={() => {}} className='h-[76px] w-[76px]' />
          </div>
        </form>
        <ModalFooter>
          <Button variant='outline' size='lg'>
            취소
          </Button>
          <Button size='lg'>수정</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
});

TodoEditModal.displayName = 'TodoEditModal';
export default TodoEditModal;
