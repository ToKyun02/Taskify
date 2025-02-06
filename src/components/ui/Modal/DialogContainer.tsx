'use client';

import { useDialogStore } from '@/stores/modalStore';
import BaseModal from './BaseModal';
import Button from '../Button/Button';

export function DialogContainer() {
  const { isOpen, message, callback, closeDialog } = useDialogStore();

  const handleConfirm = () => {
    callback?.();
    closeDialog();
  };

  return (
    <BaseModal isOpen={isOpen}>
      <div className='w-dvw max-w-[272px] rounded-lg bg-white px-4 py-6 md:max-w-[368px] md:px-6'>
        <div className='break-keep text-center text-xl font-medium'>{message}</div>
        <div className='mt-10 flex justify-center gap-2'>
          <Button size='sm' onClick={handleConfirm}>
            확인
          </Button>
        </div>
      </div>
    </BaseModal>
  );
}
