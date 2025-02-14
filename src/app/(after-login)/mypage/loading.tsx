import { Page, PageInner } from '@/components/layout/Page';

export default function loading() {
  return (
    <Page>
      <PageInner>
        <span className='text-md text-gray-40'>내정보를 불러오는 중입니다.</span>
      </PageInner>
    </Page>
  );
}
