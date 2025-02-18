import { Page, PageInner } from '@/components/layout/Page';
import { CardSkeleton } from '@/components/ui/Card';
import { GoBackSkeleton } from '@/components/ui/Link/GoBackLink';

export default function loading() {
  return (
    <Page>
      <PageInner>
        <GoBackSkeleton />
        <div className='grid gap-4'>
          <CardSkeleton count={2} />
        </div>
      </PageInner>
    </Page>
  );
}
