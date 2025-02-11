import Link from 'next/link';
import Image from 'next/image';
import LogoText from '@/assets/images/logo_ci.svg';
import LogoSymbol from '@/assets/images/logo_bi.svg';

export default function SidebarLogo() {
  return (
    <div className='flex h-16 items-center justify-start pl-5 md:px-5'>
      <Link href='/' className='flex items-center'>
        <Image src={LogoSymbol} alt='logo' />
        <Image src={LogoText} alt='logo' className='hidden md:block' />
      </Link>
    </div>
  );
}
