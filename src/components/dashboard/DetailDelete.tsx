'use client';

import { useParams, useRouter } from 'next/navigation';
import { useRemoveDashboard } from '@/apis/dashboards/queries';
import Button from '@/components/ui/Button';
import useAlert from '@/hooks/useAlert';
import { getErrorMessage } from '@/utils/errorMessage';
import useConfirm from '@/hooks/useConfirm';

export default function DetailDelete() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const alert = useAlert();
  const confirm = useConfirm();
  const { mutateAsync: remove } = useRemoveDashboard();

  const handleDelete = async () => {
    const result = await confirm('정말 삭제할까요?', {
      buttons: {
        ok: '삭제',
      },
    });
    if (!result) return;

    try {
      await remove(Number(id));
      await alert('삭제했습니다.');
      router.push(`/mydashboard`);
    } catch (error) {
      const message = getErrorMessage(error);
      alert(message);
    }
  };

  return (
    <Button variant='outline' onClick={handleDelete}>
      대시보드 삭제하기
    </Button>
  );
}
