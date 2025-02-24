'use client';

import { useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import { isAxiosError } from 'axios';
import Button from '@/components/ui/Button';
import useAlert from '@/hooks/useAlert';
import useConfirm from '@/hooks/useConfirm';
import { useCancelInviteDashboard, useDashboardInvitationsQuery } from '@/apis/dashboards/queries';
import { getErrorMessage } from '@/utils/network/errorMessage';
import { Card, CardTitle } from '@/components/ui/Card';
import { ModalHandle } from '@/components/ui/Modal';
import InviteDashboard from '@/components/dashboard/InviteDashboard';
import { Table, TableBody, TableCell, TableCol, TableColGroup, TableHead, TableHeadCell, TableRow } from '@/components/ui/Table';
import PaginationWithCounter from '@/components/pagination/PaginationWithCounter';

const PAGE_SIZE = 5;

export default function DetailInvited() {
  const { id } = useParams<{ id: string }>();
  const [page, setPage] = useState(1);
  const { data, error, isFetching } = useDashboardInvitationsQuery({ id: Number(id), page, size: PAGE_SIZE });
  const { mutateAsync: cancel } = useCancelInviteDashboard();
  const alert = useAlert();
  const confirm = useConfirm();
  const inviteModalRef = useRef<ModalHandle | null>(null);

  const cancelInvite = async (invitationId: number) => {
    const result = await confirm('정말 초대를 취소 할까요?.');
    if (!result) return;

    try {
      await cancel({ id: Number(id), invitationId });
      alert('초대를 취소했습니다.');
    } catch (error) {
      const message = getErrorMessage(error);
      alert(message);
    }
  };
  const notAllowed = isAxiosError(error) && error.status === 403;

  return (
    <Card>
      <CardTitle>
        초대내역
        <div className='leading-none'>
          <PaginationWithCounter //
            totalCount={data?.totalCount || 0}
            page={page}
            setPage={setPage}
            pageSize={PAGE_SIZE}
          />
        </div>
      </CardTitle>
      <Table className='mb-4'>
        <TableColGroup>
          <TableCol />
          <TableCol className='w-24' />
        </TableColGroup>
        <TableHead>
          <TableRow>
            <TableHeadCell>이메일</TableHeadCell>
            <TableHeadCell></TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {notAllowed && (
            <TableRow>
              <TableCell colSpan={2}>
                <div className='p-4 text-center'>권한이 없습니다.</div>
              </TableCell>
            </TableRow>
          )}

          {isFetching ? (
            <TableRow>
              <TableCell colSpan={2}>
                <div className='p-4 text-center'>초대목록을 가져오는 중입니다.</div>
              </TableCell>
            </TableRow>
          ) : (
            data?.invitations.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.invitee.email}</TableCell>
                <TableCell>
                  <Button variant='outline' size='sm' onClick={() => cancelInvite(item.id)}>
                    취소
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}

          {data?.invitations.length === 0 && (
            <TableRow>
              <TableCell colSpan={2}>
                <div className='p-4 text-center'>초대 내역이 없습니다.</div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Button className='w-full' onClick={() => inviteModalRef.current?.open()}>
        초대하기
      </Button>

      {/* 초대모달 */}
      <InviteDashboard ref={inviteModalRef} />
    </Card>
  );
}
