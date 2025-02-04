import ICON_MAIL from '@/assets/icons/email.svg';
import ICON_FACEBOOK from '@/assets/icons/facebook.svg';
import ICON_INSTAGRAM from '@/assets/icons/Instagram.svg';
import Image from 'next/image';
import Link from 'next/link';
import { RootInner } from './Inner';
import { BaseLinkItem, IconLinkItem } from './type';

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

export default function Footer() {
  return (
    <footer className='text-xs text-gray-40'>
      <RootInner className='py-8 md:flex md:h-[6.25rem] md:items-center'>
        <div className='text-center md:w-full md:text-left'>©codeit - 2023</div>
        <nav className='mb-16 mt-3 md:m-0 md:w-full'>
          <ul className='flex justify-center gap-5'>
            {FOOTER_NAV_LIST.map((item) => (
              <li key={item.path}>
                <Link href={item.path} className='hover:text-white hover:underline'>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <ul className='flex items-center justify-center gap-5 md:w-full md:justify-end'>
          {SNS_LIST.map((item, index) => (
            <li key={index}>
              <Link href={item.path} title={item.label} className='group'>
                <Image src={item.icon} alt={item.label} className='transition-transform group-hover:-translate-y-1' />
              </Link>
            </li>
          ))}
        </ul>
      </RootInner>
    </footer>
  );
}
