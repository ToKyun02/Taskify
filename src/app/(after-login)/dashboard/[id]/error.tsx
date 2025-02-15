'use client';

import { Page, PageInner } from '@/components/layout/Page';
import GoBackLink from '@/components/ui/Link/GoBackLink';

export default function Error() {
  return (
    <Page>
      <PageInner>
        <div className='mb-8'>
          <GoBackLink href='/mydashboard' />
        </div>
        <h2 className='mb-6 text-xl font-bold'>문제가 생겼습니다.</h2>
        <div className='text-gray-60'>문제가 생겼습니다. 관리자에게 문의해주세요</div>
      </PageInner>
    </Page>
  );
}
