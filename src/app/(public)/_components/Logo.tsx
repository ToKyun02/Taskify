import Link from 'next/link';
import Image from 'next/image';
import LogoBI from '@/assets/images/logo_bi_white.svg';
import LogoCI from '@/assets/images/logo_ci_white.svg';

export default function Logo() {
  return (
    <Link href='/' className='flex items-start'>
      <Image src={LogoBI} alt='taskify' className='w-6 md:w-[1.8rem]' />
      <Image src={LogoCI} alt='taskify' className='mt-2 hidden md:block' />
    </Link>
  );
}
