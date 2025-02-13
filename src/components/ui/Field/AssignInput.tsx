'use client';

import { InputHTMLAttributes, useId, useRef, useState, useEffect } from 'react';
import { cn } from '@/utils/helper';
import { BaseError, baseErrorClassName, baseFieldClassName, BaseItem, BaseLabel } from './Base';
import { BaseField } from './types';
import { useMembersQuery } from '@/apis/members/queries';
import { useParams } from 'next/navigation';
import PaginationWithCounter from '@/components/pagination/PaginationWithCounter';
import { AnimatePresence, motion } from 'motion/react';
import Image from 'next/image';
import XIcon from '@/assets/icons/x.svg';

const PAGE_SIZE = 5;

type AssignInputProps = BaseField &
  Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> & {
    value: number;
    onChange: (assignId: number) => void;
  };

export function AssignInput({ onChange, label, required, error, className }: AssignInputProps) {
  const params = useParams();
  const dashboardId = Number(params.id);
  const [page, setPage] = useState(1);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedNickname, setSelectedNickname] = useState(''); // nickname 상태 추가
  const { data } = useMembersQuery({ dashboardId, page, size: PAGE_SIZE });
  const id = useId();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleInputClick = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleSelectItem = (assignId: number, nickname: string) => {
    onChange(assignId);
    setSelectedNickname(nickname);
    setIsDropdownOpen(false);
  };

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <BaseItem>
      {label && (
        <BaseLabel required={required} htmlFor={id}>
          {label}
        </BaseLabel>
      )}
      <div ref={dropdownRef} className={cn(baseFieldClassName, 'relative flex h-auto min-h-[50px] flex-wrap items-center gap-2 px-4 py-2', error && baseErrorClassName, className)}>
        <input
          type='text'
          id={id}
          value={selectedNickname}
          readOnly
          onClick={handleInputClick}
          placeholder='담당자를 지정해 주세요'
          className={cn('flex flex-1 text-black focus-visible:outline-none', className)}
        />

        <AnimatePresence>
          {isDropdownOpen && (
            <motion.ul
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className='absolute left-0 right-0 top-0 h-[270px] divide-y divide-gray-200 overflow-y-hidden rounded-md border border-gray-40 bg-white p-2 shadow-lg'
            >
              <li className='mb-2 flex h-10 items-center justify-between px-2'>
                <div className='flex items-center gap-4'>
                  <span>담당자 목록</span>
                  <PaginationWithCounter totalCount={data?.totalCount || 0} page={page} setPage={setPage} pageSize={PAGE_SIZE} />
                </div>

                <Image src={XIcon} alt='취소 버튼' width={24} height={24} className='cursor-pointer' onClick={() => setIsDropdownOpen(false)} />
              </li>
              {data?.members.map((item) => (
                <li key={item.id} className='h-10 cursor-pointer p-2 hover:bg-gray-100' onClick={() => handleSelectItem(item.userId, item.nickname)}>
                  {item.nickname}
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
      {error && <BaseError>{error}</BaseError>}
    </BaseItem>
  );
}
