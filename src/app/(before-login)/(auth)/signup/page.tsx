import Link from 'next/link';
import SignupForm from '@/components/auth/SignupForm';
import Header from '@/components/auth/Header';

export const metadata = {
  title: 'Taskify - 회원가입',
  description: '새 계정을 만들고 Taskify와 함께 일정을 공유하며 즐겁게 관리해 보세요.',
  keywords: ['일정', '공유', '커뮤니티', '할 일', 'Taskify'],
  openGraph: {
    title: 'Taskify - 회원가입',
    description: '새 계정을 만들고 Taskify와 함께 일정을 공유하며 즐겁게 관리해 보세요.',
    url: 'https://taskify-lab.vercel.app/signup',
    type: 'website',
    images: [
      {
        url: 'https://taskify-lab.vercel.app/meta.png',
        width: 1200,
        height: 630,
        alt: 'Taskify 회원가입 이미지',
      },
    ],
  },
};

export default function Signup() {
  return (
    <>
      <Header>첫 방문을 환영합니다!</Header>
      <main className='w-full max-w-[520px]'>
        <SignupForm />
        <nav className='mt-9 flex items-center justify-center gap-2'>
          <span>이미 회원이신가요?</span>
          <Link href={'/login'} className='text-violet-20 underline'>
            로그인하기
          </Link>
        </nav>
      </main>
    </>
  );
}
