'use client';

import Button from '../ui/Button/Button';
import { useEffect, useState } from 'react';
import { useInvitationMutation, useMyInvitationsQuery } from '@/apis/invitations/queries';
import { useInView } from 'react-intersection-observer';
import useDebounce from '@/hooks/useDebounce';
import { Card, CardTitle } from '@/components/ui/Card/Card';
import MyInvitedEmptyCard from './MyInvitedEmptyCard';
import { SearchInput } from '../ui/Field';
import useAlert from '@/hooks/useAlert';
import { getErrorMessage } from '@/utils/errorMessage';

export default function MyInvitedDashboardList() {
  const [searchKeyword, setSearchKeyword] = useState('');
  const debouncedKeyword = useDebounce(searchKeyword);

  const { data, fetchNextPage, hasNextPage } = useMyInvitationsQuery(10, debouncedKeyword);
  const invitations = data?.pages.flatMap((page) => page.invitations) ?? [];
  const [ref, inView] = useInView();
  const { accept } = useInvitationMutation();
  const alert = useAlert();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const hasNoInvitations = invitations.length === 0 && !searchKeyword;
  const hasNoSearchResults = invitations.length === 0 && searchKeyword.length > 0;

  const handleAccept = async ({ id, flag }: { id: number; flag: boolean }) => {
    try {
      await accept({ id, flag });
      alert(flag ? '수락했습니다.' : '거절했습니다.');
    } catch (error) {
      const message = getErrorMessage(error);
      alert(message);
    }
  };

  return (
    <Card>
      <CardTitle>초대받은 대시보드</CardTitle>

      {hasNoInvitations ? (
        <MyInvitedEmptyCard>아직 초대받은 대시보드가 없어요.</MyInvitedEmptyCard>
      ) : (
        <div className='grid gap-10'>
          <SearchInput value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} placeholder='검색' />
          {hasNoSearchResults ? (
            <MyInvitedEmptyCard>검색된 초대가 없습니다.</MyInvitedEmptyCard>
          ) : (
            // TODO : 리스트 테이블 공용 컴포넌트화 필요
            <div className='flex flex-col gap-6'>
              <div className='px-8'>
                <div className='hidden md:block'>
                  <div className='mb-4 grid grid-cols-[1fr_1fr_2fr] gap-5 text-lg text-gray-40 lg:pl-10'>
                    <span>이름</span>
                    <span>초대자</span>
                    <span>수락 여부</span>
                  </div>
                  <div className='flex flex-col gap-5'>
                    {invitations.map((item) => (
                      <div key={item.id} className='grid grid-cols-[1fr_1fr_2fr] items-center gap-5 border-b pb-5 text-lg text-gray-70 lg:pl-10'>
                        <span>{item.dashboard.title}</span>
                        <span>{item.inviter.nickname}</span>
                        <div className='flex gap-2.5'>
                          <Button size='sm' onClick={() => handleAccept({ id: item.id, flag: true })}>
                            수락
                          </Button>
                          <Button variant='outline' size='sm' onClick={() => handleAccept({ id: item.id, flag: false })}>
                            거절
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 공통 load more 트리거 요소 */}
                <div ref={ref} className='h-8' />
              </div>
            </div>
          )}
        </div>
      )}
    </Card>
  );
}
