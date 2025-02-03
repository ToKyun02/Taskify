import { PropsWithChildren } from 'react';
import { MainInner } from './Inner';

export default function Main({ children }: PropsWithChildren) {
  return (
    <main className='text-white'>
      <MainInner>{children}</MainInner>
    </main>
  );
}
