import Link from 'next/link';
import LoginForm from '@/components/auth/LoginForm';
import Header from '@/components/auth/Header';

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
