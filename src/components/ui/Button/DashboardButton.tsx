/*
 * DashboardButton 컴포넌트
 *
 * 지원하는 variant:
 *   - 'addTodo': todo 추가용 버튼 (아이콘만 표시)
 *   - 'deleteDashboard': 대시보드 삭제용 버튼 (텍스트만 표시)
 *   - 'createDashboard': 대시보드 생성용 버튼 (텍스트와 아이콘 표시)
 *   - 'column': 컬럼 추가용 버튼 (텍스트와 아이콘 표시)
 *
 * Props:
 *   - variant: 버튼의 스타일 변형을 결정합니다. (위에 나열된 값 중 하나)
 *   - children (선택적): 기본 콘텐츠 대신 사용자 정의 내용을 렌더링합니다.
 *   - ...props: onClick, disabled 등 표준 버튼 속성을 전달할 수 있습니다.
 *
 * 사용 예:
 *   <DashboardButton variant="createDashboard" onClick={handleClick} />
 *
 */
'use client';

import type { ReactNode, ButtonHTMLAttributes } from 'react';
import Image from 'next/image';
import { cva } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import plusIcon from '@/assets/icons/plus.svg';

const dashboardButtonStyles = cva('', {
  variants: {
    variant: {
      addTodo: 'flex h-8 w-full items-center justify-center rounded-md border border-gray-30 bg-white hover:shadow-md md:h-10 lg:w-[314px]',
      deleteDashboard: 'h-[52px] w-full rounded-lg border border-gray-30 bg-white text-lg font-medium hover:shadow-md md:h-[62px] md:w-[320px] md:text-2lg',
      createDashboard: 'flex h-[58px] w-full items-center justify-center gap-3 rounded-md border border-gray-30 bg-white p-5 hover:shadow-md md:h-[70px]',
      column: 'flex h-[66px] w-full items-center justify-center gap-3 rounded-lg border border-gray-30 bg-white text-lg font-bold text-gray-70 hover:shadow-md md:h-[70px] md:text-2lg lg:w-[354px]',
    },
  },
});

export type DashboardButtonVariant = 'addTodo' | 'deleteDashboard' | 'createDashboard' | 'column';

interface DashboardButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: DashboardButtonVariant;
  children?: ReactNode;
}

export default function DashboardButton({ variant, children, ...props }: DashboardButtonProps) {
  let defaultContent: ReactNode;

  if (children) {
    defaultContent = children;
  } else {
    switch (variant) {
      case 'addTodo':
        defaultContent = (
          <span className='flex h-5 w-5 items-center justify-center rounded-sm bg-violet-10'>
            <Image src={plusIcon} className='h-auto w-[10px]' alt='새로운 대시보드 만들기' />
          </span>
        );
        break;
      case 'deleteDashboard':
        defaultContent = '대시보드 삭제하기';
        break;
      case 'createDashboard':
        defaultContent = (
          <>
            새로운 대시보드
            <span className='flex h-5 w-5 items-center justify-center rounded-sm bg-violet-10'>
              <Image src={plusIcon} className='h-auto w-[10px]' alt='새로운 대시보드 만들기' />
            </span>
          </>
        );
        break;
      case 'column':
        defaultContent = (
          <>
            새로운 컬럼 추가하기
            <span className='flex h-5 w-5 items-center justify-center rounded-sm bg-violet-10'>
              <Image src={plusIcon} className='h-auto w-[10px]' alt='새로운 대시보드 만들기' />
            </span>
          </>
        );
        break;
      default:
        defaultContent = null;
    }
  }

  return (
    <button className={twMerge(dashboardButtonStyles({ variant }))} {...props}>
      {defaultContent}
    </button>
  );
}
