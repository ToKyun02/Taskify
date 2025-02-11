'use client';

import { Card, CardTitle } from '@/components/ui/Card/Card';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import useAlert from '@/hooks/useAlert';
import PaginationWithCounter from '@/components/pagination/PaginationWithCounter';
import { useMembersMutation, useMembersQuery } from '@/apis/members/quries';
import { Table, TableBody, TableCell, TableCol, TableColGroup, TableHead, TableHeadCell, TableRow } from '@/components/ui/Table/Table';
import { isAxiosError } from 'axios';
import Button from '../ui/Button/Button';
import { getErrorMessage } from '@/utils/errorMessage';
import Avatar from '../ui/Avatar/Avatar';

const PAGE_SIZE = 5;

export default function DetailMembers() {
  const { id } = useParams<{ id: string }>();
  const [page, setPage] = useState(1);
  const { data, error, isLoading } = useMembersQuery(page, PAGE_SIZE, Number(id));
  const { remove } = useMembersMutation();
  const alert = useAlert();

  const removeMember = async (memberId: number) => {
    try {
      await remove({ memberId, dashboardId: Number(id) });
      alert('맴버를 삭제했습니다.');
    } catch (error) {
      const message = getErrorMessage(error);
      alert(message);
    }
  };
  const notAllowed = isAxiosError(error) && error.status === 403;

  return (
    <Card>
      <CardTitle>
        구성원
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
            <TableHeadCell>이름</TableHeadCell>
            <TableHeadCell></TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading && (
            <TableRow>
              <TableCell colSpan={2}>
                <div className='p-4 text-center'>구성원을 가져오는 중입니다.</div>
              </TableCell>
            </TableRow>
          )}
          {notAllowed && (
            <TableRow>
              <TableCell colSpan={2}>
                <div className='p-4 text-center'>권한이 없습니다.</div>
              </TableCell>
            </TableRow>
          )}
          {data?.members.length === 0 && (
            <TableRow>
              <TableCell colSpan={2}>
                <div className='p-4 text-center'>초대 내역이 없습니다.</div>
              </TableCell>
            </TableRow>
          )}
          {data?.members.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <div className='flex items-center gap-3'>
                  <Avatar email={item.email} />
                  {item.nickname}
                </div>
              </TableCell>
              <TableCell>
                <Button variant='outline' size='sm' onClick={() => removeMember(item.id)} disabled={item.isOwner}>
                  {item.isOwner ? '주인' : '취소'}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
