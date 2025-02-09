'use client';

import { useRef } from 'react';
import Image from 'next/image';
import CreateDashboard from '@/components/dashboard/CreateDashboard';
import { ModalHandle } from '@/components/ui/Modal/Modal';
import add_box from '@/assets/icons/add_box.svg';

export default function SidebarHeader() {
  const addDashboardModalRef = useRef<ModalHandle>(null);

  return (
    <>
      <div className='mb-4 flex justify-center md:justify-between'>
        <p className='hidden text-xs font-semibold text-gray-50 md:block'>Dash Boards</p>
        <button type='button' onClick={() => addDashboardModalRef.current?.open()}>
          <Image src={add_box} width={14} height={14} alt='add_button' className='cursor-pointer' />
        </button>
      </div>

      <CreateDashboard ref={addDashboardModalRef} />
    </>
  );
}
