import Link from 'next/link';
import Image from 'next/image';
import { RootInner } from '@/components/landing/layout/Inner';
import { BaseLinkItem } from '@/components/landing/layout/type';
import LogoBI from '@/assets/images/logo_bi_white.svg';
import LogoCI from '@/assets/images/logo_ci_white.svg';

export default function Header({ menus }: { menus: BaseLinkItem[] }) {
  return (
    <header className='fixed left-0 right-0 top-0 z-50 h-[3.75rem] bg-black/40 md:h-[4.375rem]'>
      <RootInner className='flex h-full items-center justify-between'>
        <Link href='/' className='flex items-start'>
          <Image src={LogoBI} alt='taskify' className='w-6 md:w-[1.8rem]' />
          <Image src={LogoCI} alt='taskify' className='mt-2 hidden md:block' />
        </Link>
        <nav>
          <ul className='flex items-center gap-9'>
            {menus.map((item) => (
              <li key={item.path}>
                <Link href={item.path} className='text-md text-white hover:text-violet-20 md:text-lg'>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </RootInner>
    </header>
  );
}
