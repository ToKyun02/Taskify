import { RootInner } from './Inner';
import Logo from './Logo';
import Nav from './Nav';

export default function Header() {
  return (
    <header className='h-[3.75rem] md:h-[4.375rem]'>
      <RootInner className='flex h-full items-center justify-between'>
        <Logo />
        <Nav />
      </RootInner>
    </header>
  );
}
