'use client';

import { MouseEvent, PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'motion/react';

interface BaseModalProps {
  isOpen: boolean;
  onClose?: () => void;
}

const overlay = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

const container = {
  hidden: { opacity: 0, y: -20 },
  show: { opacity: 1, y: 0 },
};

export default function BaseModal({ isOpen, onClose, children }: PropsWithChildren<BaseModalProps>) {
  if (!isOpen) return null;

  const handleDimClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose?.();
    }
  };

  return createPortal(
    <motion.div variants={overlay} initial='hidden' animate='show' className='safe-center fixed bottom-0 left-0 right-0 top-0 z-50 overflow-y-auto bg-black/20 p-8' onClick={handleDimClick}>
      <motion.div variants={container}>{children}</motion.div>
    </motion.div>,
    document.body!,
  );
}
