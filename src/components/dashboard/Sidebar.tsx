'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/utils/helper';
import SidebarDashboardList from '@/components/dashboard/SidebarDashboardList';
import SidebarLogo from '@/components/dashboard/SidebarLogo';
import SidebarHeader from '@/components/dashboard/SidebarHeader';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setIsOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  const onToggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  // 사이드메뉴 외부 클릭시 사이드 메뉴 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // 라우트에 변화가 생기면 사이드 매뉴 닫기
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <aside ref={sidebarRef} className={cn('flex h-screen w-16 flex-col transition-[width] md:w-40 lg:w-[300px]', open && 'w-56')}>
      <SidebarLogo />
      <SidebarHeader open={open} />
      <SidebarDashboardList open={open} onToggle={onToggleMenu} />
    </aside>
  );
}
