import { Page, PageInner } from '@/components/layout/Page';
import { CardSkeleton } from '@/components/ui/Card/Card';
import { GoBackSkeleton } from '@/components/ui/Link/GoBackLink';

export default function loading() {
  return (
    <Page>
      <PageInner>
        <GoBackSkeleton />
        <CardSkeleton count={2} />
      </PageInner>
    </Page>
  );
}
