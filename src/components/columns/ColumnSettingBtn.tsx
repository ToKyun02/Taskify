'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useAlert from '@/hooks/useAlert';
import { Column, ColumnForm, columnFormSchema } from '@/apis/columns/types';
import { useColumnMutation } from '@/apis/columns/queries';
import { getErrorMessage } from '@/utils/network/errorMessage';
import { Input } from '@/components/ui/Field';
import { Modal, ModalContent, ModalFooter, ModalHandle, ModalHeader } from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import Setting from '@/assets/icons/setting.svg';
import xIcon from '@/assets/icons/x.svg';
import useConfirm from '@/hooks/useConfirm';

export default function ColumnSettingBtn({ column }: { column: Column }) {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isValid, isSubmitting, isDirty },
  } = useForm<ColumnForm>({
    resolver: zodResolver(columnFormSchema),
    mode: 'onChange',
    defaultValues: {
      title: column.title,
    },
  });
  const updateModalRef = useRef<ModalHandle>(null);
  const removeModalRef = useRef<ModalHandle>(null);
  const { update, remove } = useColumnMutation(column.dashboardId);
  const alert = useAlert();
  const confirm = useConfirm();

  const handleReset = (updatedTitle?: string) => {
    reset({
      title: updatedTitle ?? column.title,
    });
    updateModalRef.current?.close();
  };

  const onClick = async () => {
    const result = await confirm('컬럼의 모든 카드가 삭제됩니다.');
    if (result) {
      await onDelete();
    }
  };

  const onSubmit = async (formData: ColumnForm) => {
    try {
      await update({ id: column.id, formData });
      handleReset(formData.title);
      alert('수정이 완료되었습니다!');
    } catch (error) {
      const message = getErrorMessage(error);
      handleReset();
      alert(message);
    }
  };

  const onDelete = async () => {
    try {
      await remove(column.id);
      removeModalRef.current?.close();
      alert('컬럼이 삭제되었습니다!');
    } catch (error) {
      const message = getErrorMessage(error);
      removeModalRef.current?.close();
      alert(message);
    }
  };

  const isDisabled = !isDirty || !isValid || isSubmitting;

  return (
    <>
      <button type='button' className='flex h-6 w-6 cursor-pointer items-center justify-center rounded-md hover:bg-gray-20' onClick={() => updateModalRef.current?.open()}>
        <Image src={Setting} alt='관리 버튼' />
      </button>

      {/* 컬럼 수정 모달 */}
      <Modal ref={updateModalRef}>
        <ModalContent>
          <ModalHeader className='flex justify-between'>
            <span>컬럼 관리</span>
            <button type='button' className='flex h-6 w-6 cursor-pointer items-center justify-center' onClick={() => handleReset()}>
              <Image src={xIcon} alt='컬럼 관리 취소 아이콘' />
            </button>
          </ModalHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input label='이름' error={errors.title?.message} placeholder='컬럼 이름을 입력해주세요' {...register('title')} />
            <ModalFooter>
              <Button type='button' variant='outline' onClick={onClick}>
                삭제
              </Button>
              <Button type='submit' disabled={isDisabled}>
                {isSubmitting ? '수정중' : '수정'}
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}
