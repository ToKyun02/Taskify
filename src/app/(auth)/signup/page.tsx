import Link from 'next/link';
import SignupForm from './_components/SignupForm';
import Header from '../_components/Header';
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
