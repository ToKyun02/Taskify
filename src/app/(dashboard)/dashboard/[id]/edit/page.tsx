import GoBackLink from '@/components/ui/Link/GoBackLink';

/*
 * GoBackLink 컴포넌트
 *
 * - 이동할 링크 주소를 href prop으로 전달하면 됩니다.
 * 예시:
 *   <GoBackLink href="/mydashboard" />
 */

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;

  return (
    <div className='p-10'>
      <GoBackLink href={`/dashboard/${id}`} />
    </div>
  );
}
