import { forwardRef } from 'react';
import { Modal, ModalContent, ModalFooter, ModalHandle, ModalHeader } from '../ui/Modal';
import { Card, CardForm, cardFormSchema } from '@/apis/cards/types';
import { AssignInput, DateInput, ImageUpload, Input, TagInput } from '../ui/Field';
import { useColumnsQuery } from '@/apis/columns/queries';
import StatusDropdown from '../ui/Dropdown/StatusDropdown';
import { Textarea } from '../ui/Field';
import Button from '../ui/Button';
import useAlert from '@/hooks/useAlert';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUpdateCard } from '@/apis/cards/queries';
import { postCardImage } from '@/apis/columns';
import convertDateFormat from '@/utils/convertDateFormat';
import { getErrorMessage } from '@/utils/errorMessage';

interface TodoEditModalProps {
  card: Card;
}

const TodoEditModal = forwardRef<ModalHandle, TodoEditModalProps>(({ card }, ref) => {
  const alert = useAlert();
  const { data: columnData } = useColumnsQuery(card.dashboardId);
  const columns = columnData?.data ?? [];

  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isValid, isSubmitting, isDirty },
  } = useForm<CardForm>({
    resolver: zodResolver(cardFormSchema),
    mode: 'onBlur',
    defaultValues: {
      dashboardId: card.dashboardId,
      columnId: card.columnId,
      assigneeUserId: card.assignee?.id || 0,
      title: card.title,
      description: card.description,
      dueDate: card.dueDate ? new Date(card.dueDate) : undefined,
      tags: card.tags || [],
      imageUrl: undefined,
    },
  });

  const { mutateAsync: updateCard } = useUpdateCard();

  const onSubmit = async (data: CardForm) => {
    try {
      let finalImageUrl = card.imageUrl;
      if (data.imageUrl instanceof File) {
        const { imageUrl } = await postCardImage(data.columnId, {
          image: data.imageUrl,
        });
        finalImageUrl = imageUrl;
      }

      await updateCard({
        id: card.id,
        cardRequest: {
          ...data,
          dueDate: convertDateFormat(data.dueDate),
          imageUrl: finalImageUrl,
        },
      });

      alert('카드가 성공적으로 수정되었습니다.');
      if (ref && 'current' in ref) {
        ref.current?.close(); // 모달 닫기
      }
    } catch (err) {
      const message = getErrorMessage(err);
      alert(message);
    }
  };

  return (
    <Modal ref={ref}>
      <ModalContent>
        <ModalHeader>
          <h3 className='text-lg font-bold text-gray-70'>할 일 수정</h3>
        </ModalHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col gap-8'>
            <div className='flex flex-col gap-8 md:flex-row'>
              <Controller
                name='columnId'
                control={control}
                render={({ field }) => {
                  const selected = columns.find((col) => col.id === card.columnId);
                  return <StatusDropdown columns={columns} selectedColumn={selected} onChange={(columnId) => field.onChange(columnId)} />;
                }}
              />

              <Controller
                name='assigneeUserId'
                control={control}
                render={({ field }) => <AssignInput defaultAssignee={card.assignee} className='w-full' label='담당자' error={errors.assigneeUserId?.message} {...field} />}
              />
            </div>
            <Input label='제목' error={errors.title?.message} placeholder='제목을 입력해 주세요' required {...register('title')} />

            <Textarea label='설명' error={errors.description?.message} placeholder='설명을 입력해 주세요' required {...register('description')} />

            <Controller name='dueDate' control={control} render={({ field }) => <DateInput label='마감일' error={errors.dueDate?.message} placeholder='날짜를 입력해주세요' required {...field} />} />

            <Controller name='tags' control={control} render={({ field }) => <TagInput label='태그' error={errors.tags?.message} placeholder='입력 후 Enter' {...field} />} />

            <Controller name='imageUrl' control={control} render={({ field }) => <ImageUpload label='이미지' error={errors.imageUrl?.message} defaultValue={card.imageUrl} {...field} />} />
          </div>

          <ModalFooter>
            <Button
              type='button'
              variant='outline'
              size='lg'
              onClick={() => {
                if (ref && 'current' in ref) {
                  ref.current?.close();
                }
              }}
            >
              취소
            </Button>
            <Button type='submit' size='lg' disabled={!isValid || isSubmitting || !isDirty}>
              {isSubmitting ? '수정중...' : '수정'}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
});

TodoEditModal.displayName = 'TodoEditModal';
export default TodoEditModal;
