import { HTMLAttributes, PropsWithChildren, Ref, useImperativeHandle, useState } from 'react';
import { cn } from '@/utils/helper';
import BaseModal from '@/components/ui/Modal/BaseModal';

/**
 * Modal 컴포넌트 (컨텐츠 주입형)
 * 모달을 생성하고 외부에서 열고 닫을 수 있는 제어를 제공
 *
 * @example
 *
 * const modalRef = useRef<ModalHandle>(null);
 *
 * modalRef.current.open()  // 모달열기
 * modalRef.current.close() // 모달닫기
 *
 * <Modal ref={modalRef}>
 *   <ModalContent> // 하얀색 배경카드 (꼭 있어야합니다.)
 *     <ModalHeader>제목</ModalHeader>
 *     <div>내용</div>
 *     <ModalFooter>버튼들</ModalFooter> // flex 배치됨
 *   </ModalContent>
 * </Modal>
 *
 * Modal내부의 컴포넌트들은 Compound 형태로, 컴포넌트를 필요에따라 넣으면됩니다.
 * 예) 상단제목이 없는 모달을 만들때는 ModalHeader를 빼면 됩니다.
 */

export type ModalHandle = {
  open: () => void;
  close: () => void;
};

type ModalProps = PropsWithChildren & {
  ref: Ref<ModalHandle>;
};

export function Modal({ ref, ...props }: ModalProps) {
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
}

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
