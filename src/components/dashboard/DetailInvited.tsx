import { useRef } from 'react';
import Button from '@/components/ui/Button/Button';
import { Card, CardTitle } from '@/components/ui/Card/Card';
import { ModalHandle } from '@/components/ui/Modal/Modal';
import InviteDashboard from './InviteDashboard';

export default function DetailInvited() {
  const inviteModalRef = useRef<ModalHandle | null>(null);

  return (
    <Card>
      <CardTitle>
        초대내역
        <div className='leading-none'>
          <Button size='sm' onClick={() => inviteModalRef.current?.open()}>
            초대하기
          </Button>
        </div>
      </CardTitle>
      <div>대시보드 초대내역(작업필요)</div>

      {/* 초대모달 */}
      <InviteDashboard ref={inviteModalRef} />
    </Card>
  );
}
