'use client';

import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Button from '@/components/ui/Button';
import useDebounce from '@/hooks/useDebounce';
import useAlert from '@/hooks/useAlert';
import { useRespondToInvitaion, useMyInvitationsQuery } from '@/apis/invitations/queries';
import { RespondToInvitationRequest } from '@/apis/invitations/types';
import { getErrorMessage } from '@/utils/network/errorMessage';
import { Card, CardTitle } from '@/components/ui/Card';
import MyInvitedEmptyCard from '@/components/dashboard/MyInvitedEmptyCard';
import { SearchInput } from '@/components/ui/Field';
import { Table, TableBody, TableCell, TableCol, TableColGroup, TableHead, TableHeadCell, TableRow } from '@/components/ui/Table';

const PAGE_SIZE = 10;

export default function MyInvitedDashboardList() {
  const [searchKeyword, setSearchKeyword] = useState('');
  const debouncedKeyword = useDebounce(searchKeyword);

  const { data, fetchNextPage, hasNextPage } = useMyInvitationsQuery({ size: PAGE_SIZE, title: debouncedKeyword });
  const invitations = data?.pages.flatMap((page) => page.invitations) ?? [];
  const [ref, inView] = useInView();
  const { mutateAsync: accept } = useRespondToInvitaion();
  const alert = useAlert();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const hasNoInvitations = invitations.length === 0 && !searchKeyword;
  const hasNoSearchResults = invitations.length === 0 && searchKeyword.length > 0;

  const handleAccept = async ({ invitationId, inviteAccepted }: RespondToInvitationRequest) => {
    try {
      await accept({ invitationId, inviteAccepted });
      alert(inviteAccepted ? '수락했습니다.' : '거절했습니다.');
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
        <div className='grid gap-4 md:gap-10'>
          <SearchInput value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} placeholder='검색' />
          {hasNoSearchResults ? (
            <MyInvitedEmptyCard>검색된 초대가 없습니다.</MyInvitedEmptyCard>
          ) : (
            <div>
              <Table responsive>
                <TableColGroup className='hidden md:table-column-group'>
                  <TableCol />
                  <TableCol className='w-[20%]' />
                  <TableCol className='w-48' />
                </TableColGroup>
                <TableHead>
                  <TableRow>
                    <TableHeadCell>이름</TableHeadCell>
                    <TableHeadCell>초대자</TableHeadCell>
                    <TableHeadCell>수락 여부</TableHeadCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {invitations.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell label='이름'>{item.dashboard.title}</TableCell>
                      <TableCell label='초대자'>{item.inviter.nickname}</TableCell>
                      <TableCell>
                        <div className='flex w-full gap-2'>
                          <Button size='sm' onClick={() => handleAccept({ invitationId: item.id, inviteAccepted: true })}>
                            수락
                          </Button>
                          <Button variant='outline' size='sm' onClick={() => handleAccept({ invitationId: item.id, inviteAccepted: false })}>
                            거절
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* 공통 load more 트리거 요소 */}
              <div ref={ref} />
            </div>
          )}
        </div>
      )}
    </Card>
  );
}
