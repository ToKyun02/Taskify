import { PropsWithChildren } from 'react';
import Footer from '@/components/landing/layout/Footer';
import Main from '@/components/landing/layout/Main';
import SmoothScroll from '@/components/landing/SmoothScroll';
import Header from '@/components/landing/layout/Header';
import { BaseLinkItem, IconLinkItem } from '@/components/landing/layout/type';
import ICON_MAIL from '@/assets/icons/email.svg';
import ICON_FACEBOOK from '@/assets/icons/facebook.svg';
import ICON_INSTAGRAM from '@/assets/icons/Instagram.svg';

const ROOT_NAV_LIST: BaseLinkItem[] = [
  {
    path: '/login',
    label: '로그인',
  },
  {
    path: '/signup',
    label: '회원가입',
  },
];

const FOOTER_NAV_LIST: BaseLinkItem[] = [
  {
    path: '/privacy',
    label: 'Privacy Policy',
  },
  {
    path: '/faq',
    label: 'FAQ',
  },
];

const SNS_LIST: IconLinkItem[] = [
  {
    path: '#',
    icon: ICON_MAIL,
    label: 'Email',
  },
  {
    path: '#',
    icon: ICON_FACEBOOK,
    label: 'Facebook',
  },
  {
    path: '#',
    icon: ICON_INSTAGRAM,
    label: 'Instagram',
  },
];

export const metadata = {
  title: 'Taskify',
  description: 'Taskify는 가족, 회사, 친구들과 함께 일정을 쉽고 즐겁게 관리할 수 있는 서비스입니다.',
  keywords: ['일정', '공유', '커뮤니티', '할 일', 'Taskify'],
  openGraph: {
    title: 'Taskify',
    description: 'Taskify는 가족, 회사, 친구들과 함께 일정을 쉽고 즐겁게 관리할 수 있는 서비스입니다.',
    url: 'https://taskify-lab.vercel.app/',
    type: 'website',
    images: [
      {
        url: 'https://taskify-lab.vercel.app/meta.png',
        width: 1200,
        height: 630,
        alt: 'Taskify 랜딩 페이지 이미지',
      },
    ],
  },
};

export default function layout({ children }: PropsWithChildren) {
  return (
    <SmoothScroll>
      <div className='min-h-dvh bg-black'>
        {/* header */}
        <Header menus={ROOT_NAV_LIST} />

        {/* contents */}
        <Main>{children}</Main>

        {/* footer */}
        <Footer menus={FOOTER_NAV_LIST} sns={SNS_LIST} />
      </div>
    </SmoothScroll>
  );
}
