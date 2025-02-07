'use client';

import SidebarDashboardList from '@/components/dashboard/SidebarDashboardList';
import SidebarLogo from '@/components/dashboard/SidebarLogo';
import SidebarHeader from '@/components/dashboard/SidebarHeader';

export default function Sidebar() {
  return (
    <aside className='flex h-screen flex-col px-2 py-5'>
      <SidebarLogo />
      <SidebarHeader />
      <SidebarDashboardList />
    </aside>
  );
}
