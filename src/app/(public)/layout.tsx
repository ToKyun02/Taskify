import { PropsWithChildren } from 'react';
import Header from './_components/Header';
import Footer from './_components/Footer';
import Main from './_components/Main';

export default function layout({ children }: PropsWithChildren) {
  return (
    <div className='min-h-dvh bg-black'>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </div>
  );
}
