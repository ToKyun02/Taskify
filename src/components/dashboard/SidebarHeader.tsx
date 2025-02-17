'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { cn } from '@/utils/helper';
import CreateDashboard from '@/components/dashboard/CreateDashboard';
import { ModalHandle } from '@/components/ui/Modal';
import add_box from '@/assets/icons/add_box.svg';

export default function SidebarHeader({ open }: { open: boolean }) {
  const addDashboardModalRef = useRef<ModalHandle>(null);

  return (
    <>
      <div className='my-3 flex h-6 items-center justify-between px-6 md:px-3 lg:px-4'>
        <div className={cn('hidden whitespace-nowrap text-xs font-semibold text-gray-50 md:block', open && 'block')}>Dash Boards</div>
        <button type='button' onClick={() => addDashboardModalRef.current?.open()}>
          <Image src={add_box} alt='add_button' className='pointer-events-none h-auto w-4' />
        </button>
      </div>

      <CreateDashboard ref={addDashboardModalRef} />
    </>
  );
}
