import Image from 'next/image';
import logo from '@/assets/images/sidebar_logo.png';
import logo_ci from '@/assets/images/logo_ci.png';

export default function SidebarLogo() {
  return (
    <>
      <Image src={logo} width={108} height={33} alt='logo' className='hidden md:flex' />

      <Image src={logo_ci} width={23} height={25} alt='logo' className='h-[25px] w-[23px] md:hidden' />
    </>
  );
}
