import GoBackLink from '@/components/ui/Link/GoBackLink';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;

  return (
    <div className='p-10'>
      <GoBackLink href={`/dashboard/${id}`} />
    </div>
  );
}
