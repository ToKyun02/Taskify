import React from 'react';

interface TitleProps {
  title?: string;
}

export default function Title({ title }: TitleProps) {
  return (
    <div className='flex items-center'>
      <span className='hidden text-[20px] font-bold lg:block'>{title}</span>
    </div>
  );
}
