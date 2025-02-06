import Image from 'next/image';
import Link from 'next/link';
import { RootInner } from './Inner';
import { BaseLinkItem, IconLinkItem } from './type';

export default function Footer({ menus, sns }: { menus: BaseLinkItem[]; sns: IconLinkItem[] }) {
  return (
    <footer className='text-xs text-gray-40'>
      <RootInner className='py-8 md:flex md:h-[6.25rem] md:items-center'>
        <div className='text-center md:w-full md:text-left'>©codeit - 2023</div>
        <nav className='mb-16 mt-3 md:m-0 md:w-full'>
          <ul className='flex justify-center gap-5'>
            {menus.map((item) => (
              <li key={item.path}>
                <Link href={item.path} className='hover:text-white hover:underline'>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <ul className='flex items-center justify-center gap-5 md:w-full md:justify-end'>
          {sns.map((item, index) => (
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
