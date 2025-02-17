'use client';

import { useDialogStore } from '@/stores/modalStore';
import BaseModal from '@/components/ui/Modal/BaseModal';
import Button from '@/components/ui/Button';

export function DialogContainer() {
  const { isOpen, message, type, buttons, callback, resolvePromise, rejectPromise } = useDialogStore();

  const handleConfirm = () => {
    callback?.();
    resolvePromise?.();
  };

  const handleCancel = () => {
    rejectPromise?.();
  };

  return (
    <BaseModal isOpen={isOpen}>
      <div className='w-dvw max-w-[272px] rounded-lg bg-white px-4 py-6 md:max-w-[368px] md:px-6'>
        <div className='break-keep text-center text-xl font-medium'>{message}</div>
        <div className='mt-10 flex justify-center gap-2'>
          {type === 'confirm' && (
            <Button size='sm' variant='outline' onClick={handleCancel}>
              {buttons.cancel}
            </Button>
          )}
          <Button size='sm' onClick={handleConfirm}>
            {buttons.ok}
          </Button>
        </div>
      </div>
    </BaseModal>
  );
}
