import Link from 'next/link';
import Arrow from '@/components/pagination/Arrow';

interface GoBackLinkProps {
  href: string;
}

export default function GoBackLink({ href }: GoBackLinkProps) {
  return (
    <Link href={href} className='flex items-center gap-2 text-center text-md font-medium text-gray-70 md:text-lg'>
      <Arrow direction='left' className='h-[13px] w-[7px] text-gray-70 md:h-[16px] md:w-[8px]' />
      돌아가기
    </Link>
  );
}
