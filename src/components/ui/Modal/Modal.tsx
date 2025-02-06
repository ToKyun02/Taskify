import { forwardRef, HTMLAttributes, PropsWithChildren, useImperativeHandle, useState } from 'react';
import BaseModal from './BaseModal';
import { cn } from '@/utils/helper';

export type ModalHandle = {
  open: () => void;
  close: () => void;
};

export const Modal = forwardRef<ModalHandle, PropsWithChildren>((props, ref) => {
  const [isOpen, setIsOpen] = useState(false);

  useImperativeHandle(ref, () => {
    return {
      open() {
        setIsOpen(true);
      },
      close() {
        setIsOpen(false);
      },
    };
  });

  return <BaseModal isOpen={isOpen} onClose={() => setIsOpen(false)} {...props} />;
});

export function ModalHeader({ children, className, ...props }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return (
    <header className={cn('mb-4 flex h-9 items-center justify-between text-xl font-bold md:text-2xl', className)} {...props}>
      {children}
    </header>
  );
}

export function ModalContent({ children, className, ...props }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return (
    <div className={cn('w-dvw max-w-[327px] rounded-lg bg-white px-4 py-6 md:max-w-[584px] md:px-6', className)} {...props}>
      {children}
    </div>
  );
}

export function ModalFooter({ children, className, ...props }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return (
    <footer className={cn('mt-6 flex gap-2', className)} {...props}>
      {children}
    </footer>
  );
}

// eslintreact/display-name (forwardref)
Modal.displayName = 'Modal';
