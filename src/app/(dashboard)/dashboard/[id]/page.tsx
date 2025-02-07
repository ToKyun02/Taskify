export default async function DashboardDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  return <div className='p-10'>아이디 {id} : 대시보드 상세페이지</div>;
}
