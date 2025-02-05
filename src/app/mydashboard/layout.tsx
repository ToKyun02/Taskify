import Sidebar from '@/components/Sidebar/Sidebar';
import { ReactNode } from 'react';
import Header from '@/components/dashboard-header/Header';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className='flex'>
      <Sidebar />
      <Header showCrown showSetting showMembers showProfile />
      <main className='flex-1'>{children}</main>
    </div>
  );
}
