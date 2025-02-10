import Link from 'next/link';
import Button from '@/components/ui/Button/Button';
import TodoCard from '@/components/dashboard/TodoCard';

export default async function DashboardDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;

  return (
    <div className='p-10'>
      <div>
        <Link href={`/dashboard/${id}/edit`}>
          <Button>수정하기</Button>
        </Link>
        <TodoCard />
      </div>
    </div>
  );
}
