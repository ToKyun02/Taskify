'use client';

import { useRef } from 'react';
import { ModalHandle } from '@/components/ui/Modal/Modal';
import CreateDashboard from './CreateDashboard';
import MyDashboardList from './MyDashboardList';

export default function MyDashboard() {
  const addDashboardModalRef = useRef<ModalHandle>(null);

  return (
    <>
      <MyDashboardList onAdd={() => addDashboardModalRef.current?.open()} />
      <CreateDashboard ref={addDashboardModalRef} />
    </>
  );
}
