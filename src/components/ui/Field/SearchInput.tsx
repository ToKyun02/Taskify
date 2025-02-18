import { InputHTMLAttributes, Ref } from 'react';
import Image from 'next/image';
import { cn } from '@/utils/helper';
import { baseFieldClassName } from '@/components/ui/Field/Base';
import { BaseField } from '@/components/ui/Field/types';
import searchIcon from '@/assets/icons/search.svg';

type SearchInputProps = BaseField &
  InputHTMLAttributes<HTMLInputElement> & {
    ref?: Ref<HTMLInputElement>;
  };

export function SearchInput({ className, ref, ...props }: SearchInputProps) {
  return (
    <div className='relative'>
      <input {...props} className={cn(baseFieldClassName, 'pl-10', className)} ref={ref} />
      <Image src={searchIcon} className='pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2' alt='search' />
    </div>
  );
}
