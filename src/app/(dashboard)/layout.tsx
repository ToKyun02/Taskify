import { PropsWithChildren } from 'react';
import Header from '@/components/dashboard-header/Header';
import Sidebar from '@/components/Sidebar/Sidebar';

export default function layout({ children }: PropsWithChildren) {
  return (
    <div className='flex h-screen'>
      {/* sidebar */}
      <div className='w-[67px] border-r bg-white md:w-[160px] lg:w-[300px]'>
        <Sidebar />
      </div>

      {/* main */}
      <main className='flex-1 overflow-y-auto bg-gray-10'>
        {/* header */}
        <div className='sticky left-0 top-0 z-30 bg-white'>
          <Header showCrown showSetting showMembers showProfile />
        </div>

        {/* content page */}
        {children}
      </main>
    </div>
  );
}
