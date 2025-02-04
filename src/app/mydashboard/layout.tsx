import Sidebar from '@/components/Sidebar/Sidebar';
import { ReactNode } from 'react';
import Header from '@/components/dashboard-header/Header';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className='flex'>
      <Sidebar />
      <Header title='나의 대시보드' showCrown showSetting showUsers showProfile />
      <main className='flex-1'>{children}</main>
    </div>
  );
}
