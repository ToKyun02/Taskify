'use client';

import { useRef } from 'react';
import { ModalHandle } from '@/components/ui/Modal';
import CreateDashboard from '@/components/dashboard/CreateDashboard';
import MyDashboardList from '@/components/dashboard/MyDashboardList';

export default function MyDashboard() {
  const addDashboardModalRef = useRef<ModalHandle>(null);

  return (
    <>
      <MyDashboardList onAdd={() => addDashboardModalRef.current?.open()} />
      <CreateDashboard ref={addDashboardModalRef} />
    </>
  );
}
