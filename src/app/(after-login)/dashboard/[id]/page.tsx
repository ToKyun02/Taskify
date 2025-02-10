import Link from 'next/link';
import Button from '@/components/ui/Button/Button';

export default async function DashboardDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;

  return (
    <div className='p-10'>
      <div className='mb-8'>아이디 {id} : 대시보드 상세페이지</div>
      <div>
        <Link href={`/dashboard/${id}/edit`}>
          <Button>수정하기</Button>
        </Link>
      </div>
    </div>
  );
}
