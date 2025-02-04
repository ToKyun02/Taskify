import { RootInner } from './Inner';
import Logo from './Logo';
import Nav from './Nav';

export default function Header() {
  return (
    <header className='fixed left-0 right-0 top-0 z-50 h-[3.75rem] bg-black/40 md:h-[4.375rem]'>
      <RootInner className='flex h-full items-center justify-between'>
        <Logo />
        <Nav />
      </RootInner>
    </header>
  );
}
