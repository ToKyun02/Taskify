import Link from 'next/link';
import LoginForm from '@/components/auth/LoginForm';
import Header from '@/components/auth/Header';

export const metadata = {
  title: 'Taskify - 로그인',
  description: 'Taskify에 로그인하고, 함께 일정을 공유하며 더 나은 하루를 시작해 보세요.',
  keywords: ['일정', '공유', '커뮤니티', '할 일', 'Taskify'],
  openGraph: {
    title: 'Taskify - 로그인',
    description: 'Taskify에 로그인하고, 함께 일정을 공유하며 더 나은 하루를 시작해 보세요.',
    url: 'https://taskify-lab.vercel.app/login',
    type: 'website',
    images: [
      {
        url: 'https://taskify-lab.vercel.app/meta.png',
        width: 1200,
        height: 630,
        alt: 'Taskify 로그인 이미지',
      },
    ],
  },
};

export default function Login() {
  return (
    <>
      <Header>오늘도 만나서 반가워요!</Header>
      <main className='w-full max-w-[520px]'>
        <LoginForm />
        <nav className='mt-9 flex items-center justify-center gap-2'>
          <span>회원이 아니신가요?</span>
          <Link href={'/signup'} className='text-violet-20 underline'>
            회원가입하기
          </Link>
        </nav>
      </main>
    </>
  );
}
