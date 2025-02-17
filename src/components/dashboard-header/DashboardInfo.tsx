'use client';

import { useRef } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import useMediaQuery from '@/hooks/useMediaQuery';
import { useDashboardQuery } from '@/apis/dashboards/queries';
import { useMembersQuery } from '@/apis/members/queries';
import StackAvatars from '@/components/ui/Avatar/StackAvatars';
import { ModalHandle } from '@/components/ui/Modal';
import InviteDashboard from '@/components/dashboard/InviteDashboard';
import HeaderButton from '@/components/dashboard-header/HeaderButton';
import Setting from '@/assets/icons/setting.svg';
import AddBox from '@/assets/icons/add_box.svg';
import crown from '@/assets/icons/crown.svg';

export default function DashboardInfo() {
  const { id } = useParams();
  const { data: dashboardDetail } = useDashboardQuery(Number(id));
  const { data: membersData } = useMembersQuery({ dashboardId: Number(id), page: 1, size: 4 });
  const inviteModalRef = useRef<ModalHandle | null>(null);

  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const isTablet = useMediaQuery('(min-width: 768px)');
  const visibleCount = isDesktop ? 4 : isTablet ? 3 : 2;

  return (
    <div className='mr-4 flex items-center gap-4 border-r border-gray-30 pr-4 md:mr-6 md:pr-6 lg:mr-9 lg:pr-9'>
      {/* 대시보드 방 제목 */}
      <h2 className='hidden items-center gap-2 text-xl font-bold leading-none xl:flex'>
        <span className='overflow-hidden text-ellipsis whitespace-nowrap'>{dashboardDetail?.title}</span>
        {dashboardDetail?.createdByMe && <Image src={crown} alt='crown' />}
      </h2>

      <div className='ml-auto flex items-center gap-4 leading-none md:gap-8 lg:gap-10'>
        {/* 대시보드 관리자만 보임 : 대시보드 관리 버튼) */}
        {dashboardDetail?.createdByMe && (
          <div className='flex gap-[6px] md:gap-3 lg:gap-4'>
            <HeaderButton href={`/dashboard/${id}/edit`}>
              <Image src={Setting} alt='관리' className='hidden sm:block' />
              관리
            </HeaderButton>
            <HeaderButton onClick={() => inviteModalRef.current?.open()}>
              <Image src={AddBox} alt='초대하기' className='hidden sm:block' />
              초대하기
            </HeaderButton>

            {/* 초대모달 */}
            <InviteDashboard ref={inviteModalRef} />
          </div>
        )}

        {/* 모든 맴버가 보임 : 대시보드 맴버목록 */}
        <StackAvatars members={membersData?.members || []} visibleCount={visibleCount} totalCount={membersData?.totalCount || 0} />
      </div>
    </div>
  );
}
