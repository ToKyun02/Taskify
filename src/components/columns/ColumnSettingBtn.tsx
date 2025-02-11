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
  const modalRef = useRef<ModalHandle>(null);
  const { update } = useColumnMutation(column.dashboardId);
  const alert = useAlert();

  const handleReset = () => {
    reset({
      title: column.title,
    });
    if (modalRef && 'current' in modalRef) modalRef.current?.close();
  };

  // TODO: 컬럼 삭제 핸들러 구현 예정
  const onClick = () => {
    modalRef.current?.close();
  };

  const onSubmit = async (formData: ColumnForm) => {
    try {
      await update({ id: column.id, formData });
      handleReset();
      alert('수정이 완료되었습니다!');
    } catch (error) {
      const message = getErrorMessage(error);
      alert(message);
    }
  };

  const isDisabled = !isDirty || !isValid || isSubmitting;

  return (
    <div className='cursor-pointer'>
      <Image src={Setting} alt='관리 버튼' width={18} height={18} onClick={() => modalRef.current?.open()} />
      <Modal ref={modalRef}>
        <ModalContent>
          <ModalHeader>컬럼 관리</ModalHeader>
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
    </div>
  );
}
