import Sidebar from '@/components/Sidebar/Sidebar';
import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className='flex'>
      <Sidebar />

      <main className='flex-1'>{children}</main>
    </div>
  );
}
