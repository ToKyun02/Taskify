import { PropsWithChildren } from 'react';
import Header from '@/components/dashboard-header/Header';
import Sidebar from '@/components/dashboard/Sidebar';

export default function layout({ children }: PropsWithChildren) {
  return (
    <div className='flex h-screen'>
      {/* sidebar */}
      <div className='fixed top-0 z-50 w-auto overflow-hidden border-r bg-white md:relative md:w-[160px] lg:w-[300px]'>
        <Sidebar />
      </div>

      {/* main */}
      <main className='flex-1 overflow-y-auto bg-gray-10 pl-16 md:pl-0'>
        {/* header */}
        <div className='sticky left-16 top-0 z-30 bg-white md:left-0'>
          <Header />
        </div>

        {/* content page */}
        {children}
      </main>
    </div>
  );
}
