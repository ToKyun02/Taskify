'use client';

import { ColumnForm, columnFormSchema, ColumnsResponse } from '@/apis/columns/types';
import DashboardButton from '@/components/ui/Button/DashboardButton';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Modal, ModalContent, ModalFooter, ModalHandle, ModalHeader } from '@/components/ui/Modal/Modal';
import { useRef } from 'react';
import useAlert from '@/hooks/useAlert';
import { Input } from '@/components/ui/Field';
import Button from '../ui/Button/Button';
import { useColumnMutation } from '@/apis/columns/queries';
import { getErrorMessage } from '@/utils/errorMessage';
import xIcon from '@/assets/icons/x.svg';
import Image from 'next/image';
import { some } from 'es-toolkit/compat';

interface AddColumnBtnProps {
  dashboardId: number;
  columns: ColumnsResponse['data'] | void;
}

export default function AddColumnBtn({ dashboardId, columns }: AddColumnBtnProps) {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isValid, isSubmitting, isDirty },
    setError,
  } = useForm<ColumnForm>({
    resolver: zodResolver(columnFormSchema),
    mode: 'onChange',
    defaultValues: {
      title: '',
    },
  });

  const modalRef = useRef<ModalHandle>(null);
  const { create } = useColumnMutation(dashboardId);
  const alert = useAlert();

  const handleReset = () => {
    reset();
    modalRef.current?.close();
  };

  const onSubmit = async (formData: ColumnForm) => {
    try {
      if (columns) {
        const isExist = some(columns, { title: formData.title });
        if (isExist) {
          setError('title', { message: '중복된 컬럼 이름입니다.' });
          return;
        }
      }

      await create(formData);
      handleReset();
      alert('컬럼이 생성되었습니다!');
    } catch (error) {
      const message = getErrorMessage(error);
      handleReset();
      alert(message);
    }
  };

  const isDisabled = !isDirty || !isValid || isSubmitting;

  return (
    <li className='flex flex-col gap-4 border-b p-6 lg:min-h-[calc(100dvh-70px)] lg:border-b-0'>
      <div className='lg:h-7' />
      <DashboardButton variant='column' onClick={() => modalRef.current?.open()} />
      <Modal ref={modalRef}>
        <ModalContent>
          <ModalHeader className='flex justify-between'>
            <span>새 컬럼 생성</span>
            <Image src={xIcon} alt='컬럼 생성 취소 아이콘' width={24} height={24} onClick={() => handleReset()} className='cursor-pointer' />
          </ModalHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input label='이름' error={errors.title?.message} placeholder='컬럼 이름을 입력해주세요' {...register('title')} />
            <ModalFooter>
              <Button type='button' variant='outline' onClick={() => handleReset()}>
                취소
              </Button>
              <Button type='submit' disabled={isDisabled}>
                {isSubmitting ? '생성중' : '생성'}
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </li>
  );
}
