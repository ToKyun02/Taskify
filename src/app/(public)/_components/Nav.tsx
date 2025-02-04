import Link from 'next/link';
import { BaseLinkItem } from './type';

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

export default function Nav() {
  return (
    <nav>
      <ul className='flex items-center gap-9'>
        {ROOT_NAV_LIST.map((item) => (
          <li key={item.path}>
            <Link href={item.path} className='text-md text-white hover:text-violet-20 md:text-lg'>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
