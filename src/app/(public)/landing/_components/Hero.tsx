import { useState } from 'react';
import Image from 'next/image';
import { easeInOut, motion } from 'motion/react';
import Lottie from 'lottie-react';
import LottieData from '@/assets/landings/hero.json';
import LogoFull from '@/assets/images/logo_full_white.svg';

const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const childVariants = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { ease: easeInOut } },
};

export default function Hero() {
  const [lottieLoaded, setLottieLoaded] = useState(false);

  return (
    <motion.div //
      initial='initial'
      whileInView='animate'
      variants={containerVariants}
      className='py-24 md:py-40'
    >
      <motion.div //
        variants={childVariants}
        className='relative mx-auto mb-[1.625rem] aspect-[1.7/1] w-full max-w-[722px] overflow-hidden rounded-lg bg-violet-20 md:mb-12'
      >
        <div className='relative mx-auto mt-[15%] aspect-[189/61] w-[26%]'>
          <Image src={LogoFull} alt='TASKIFY' fill />
        </div>
        {/* TODO: clsx 패키지 추가후, 클래스 정리 필요 */}
        <div className={`absolute bottom-0 left-0 right-0 transition-opacity ${lottieLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <Lottie //
            animationData={LottieData}
            loop={true}
            onDOMLoaded={() => setLottieLoaded(true)}
          />
          <div className='h-10 bg-[#eee]'></div>
        </div>
      </motion.div>
      <motion.h1 //
        variants={childVariants}
        className='mb-[6.25rem] flex flex-col items-center md:mb-[6.875rem] md:flex-row md:justify-center md:gap-4'
      >
        <span className='text-[2.5rem] font-bold tracking-tight text-white md:text-[3.5rem] lg:text-[4.75rem]'>새로운 일정 관리</span>
        <span className='font-mont text-[2.625rem] font-thin tracking-normal text-violet-20 md:text-[4.375rem] lg:text-[5.625rem]'>Taskify</span>
      </motion.h1>
      <motion.button
        variants={childVariants}
        className='mx-auto flex h-[2.875rem] w-[14.69rem] items-center justify-center rounded-lg bg-violet-20 text-md font-medium md:h-[3.375rem] md:w-[17.5rem] md:text-2lg'
      >
        로그인하기
      </motion.button>
    </motion.div>
  );
}
