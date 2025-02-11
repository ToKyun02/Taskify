'use client';

import { useRef } from 'react';
import { Modal, ModalContent, ModalFooter, ModalHandle, ModalHeader } from '@/components/ui/Modal/Modal';
import Image from 'next/image';
import Setting from '@/assets/icons/setting.svg';
import Button from '@/components/ui/Button/Button';
import { useForm } from 'react-hook-form';
import { Column, ColumnForm, columnFormSchema } from '@/apis/columns/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/Field';
import { getErrorMessage } from '@/utils/errorMessage';
import useAlert from '@/hooks/useAlert';
import { useColumnMutation } from '@/apis/columns/queries';
import xIcon from '@/assets/icons/x.svg';

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

  const handleReset = (updatedTitle?: string) => {
    reset({
      title: updatedTitle ?? column.title,
    });
    updateModalRef.current?.close();
  };

  const onClick = () => {
    updateModalRef.current?.close();
    removeModalRef.current?.open();
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
    <div className='cursor-pointer'>
      <Image src={Setting} alt='관리 버튼' width={18} height={18} onClick={() => updateModalRef.current?.open()} />
      {/* 컬럼 수정 모달 */}
      <Modal ref={updateModalRef}>
        <ModalContent>
          <ModalHeader className='flex justify-between'>
            <span>컬럼 관리</span>
            <Image src={xIcon} alt='컬럼 관리 취소 아이콘' width={24} height={24} onClick={() => handleReset()} className='cursor-pointer' />
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
      {/* 컬럼 제거 모달 */}
      <Modal ref={removeModalRef}>
        <ModalContent>
          <div className='py-3 text-center'>컬럼의 모든 카드가 삭제됩니다.</div>
          <ModalFooter>
            <Button
              variant='outline'
              onClick={() => {
                removeModalRef.current?.close();
                updateModalRef.current?.open();
              }}
            >
              취소
            </Button>
            <Button onClick={async () => await onDelete()}>삭제</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
