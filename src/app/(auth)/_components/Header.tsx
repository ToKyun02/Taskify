import Image from 'next/image';
import Link from 'next/link';
import LogoCi from '@/assets/images/logo_ci.png';
import LogoBi from '@/assets/images/logo_bi.png';

export default function Header() {
  return (
    <header className='flex flex-col items-center gap-[10px]'>
      <Link href={'/'} className='flex flex-col gap-[30px]'>
        <Image src={LogoCi} alt='로고 CI 이미지' width={200} height={200} />
        <Image src={LogoBi} alt='로고 BI 이미지' width={200} height={56} />
      </Link>
      <p className='text-xl font-medium text-gray-70'>오늘도 만나서 반가워요!</p>
    </header>
  );
}
