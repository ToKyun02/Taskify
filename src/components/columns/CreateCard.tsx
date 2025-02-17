'use client';

import { forwardRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useAlert from '@/hooks/useAlert';
import { CardForm, cardFormSchema } from '@/apis/cards/types';
import { useCreateCard } from '@/apis/cards/queries';
import { postCardImage } from '@/apis/columns';
import { getErrorMessage } from '@/utils/errorMessage';
import convertDateFormat from '@/utils/convertDateFormat';
import { Modal, ModalContent, ModalFooter, ModalHandle, ModalHeader } from '@/components/ui/Modal';
import { AssignInput, DateInput, ImageUpload, Input, TagInput, Textarea } from '@/components/ui/Field';
import Button from '@/components/ui/Button';
import { DEFAULT_CARD_IMAGE_URL } from '@/constants/paths';

const DEFAULT_POST_IMAGE = { imageUrl: DEFAULT_CARD_IMAGE_URL } as const;

interface CreateCardProps {
  dashboardId: number;
  columnId: number;
}

const CreateCard = forwardRef<ModalHandle, CreateCardProps>(({ dashboardId, columnId }, ref) => {
  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm<CardForm>({
    resolver: zodResolver(cardFormSchema),
    mode: 'onBlur',
    defaultValues: {
      dashboardId,
      columnId,
      assigneeUserId: 0,
      title: '',
      description: '',
      dueDate: undefined,
      tags: [],
      imageUrl: undefined,
    },
  });

  const { mutateAsync: create } = useCreateCard();
  const alert = useAlert();

  const handleReset = () => {
    reset();
    if (ref && 'current' in ref) {
      ref.current?.close();
    }
  };

  const onSubmit = async (data: CardForm) => {
    try {
      const { imageUrl } = data.imageUrl
        ? await postCardImage(columnId, {
            image: data.imageUrl,
          })
        : DEFAULT_POST_IMAGE;
      await create({
        ...data,
        dueDate: convertDateFormat(data.dueDate),
        imageUrl,
      });
      handleReset();
    } catch (error) {
      const message = getErrorMessage(error);
      alert(message);
    }
  };

  return (
    <Modal ref={ref}>
      <ModalContent>
        <ModalHeader>할 일 생성</ModalHeader>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
          <input type='hidden' {...register('dashboardId')} />
          <input type='hidden' {...register('columnId')} />
          <Controller
            name='assigneeUserId'
            control={control}
            render={({ field }) => {
              return <AssignInput label='담당자' error={errors.assigneeUserId?.message} required {...field} />;
            }}
          />
          <Input label='제목' error={errors.title?.message} placeholder='제목을 입력해 주세요' required {...register('title')} />
          <Textarea label='설명' error={errors.description?.message} placeholder='설명을 입력해 주세요' required {...register('description')} />
          <Controller
            name='dueDate'
            control={control}
            render={({ field }) => {
              return <DateInput label='마감일' error={errors.dueDate?.message} placeholder='날짜를 입력해주세요' required {...field} />;
            }}
          />
          <Controller
            name='tags'
            control={control}
            render={({ field }) => {
              return <TagInput label='태그' error={errors.tags?.message} placeholder='입력후 Enter' {...field} />;
            }}
          />
          <Controller
            name='imageUrl'
            control={control}
            render={({ field }) => {
              return <ImageUpload label='이미지' error={errors.imageUrl?.message} {...field} />;
            }}
          />
          <ModalFooter>
            <Button type='button' variant='outline' size='lg' onClick={handleReset}>
              취소
            </Button>
            <Button type='submit' size='lg' disabled={!isValid || isSubmitting}>
              {isSubmitting ? '생성중' : '생성'}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
});

CreateCard.displayName = 'CreateCard';

export default CreateCard;
