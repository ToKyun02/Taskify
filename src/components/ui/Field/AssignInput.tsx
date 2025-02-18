'use client';

import { InputHTMLAttributes, useId, useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { AnimatePresence, motion } from 'motion/react';
import { useMembersQuery } from '@/apis/members/queries';
import { Member } from '@/apis/members/types';
import { cn } from '@/utils/helper';
import { BaseError, baseErrorClassName, baseFieldClassName, BaseItem, BaseLabel } from '@/components/ui/Field/Base';
import { BaseField } from '@/components/ui/Field/types';
import PaginationWithCounter from '@/components/pagination/PaginationWithCounter';
import Avatar from '@/components/ui/Avatar';
import { Assignee } from '@/types/common';
import XIcon from '@/assets/icons/x.svg';

const PAGE_SIZE = 5;

const SCROLL_BAR_CLASS_NAME = '[&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar]:w-1';

type AssignInputProps = BaseField &
  Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> & {
    value: number;
    onChange: (assignId: number) => void;
    defaultAssignee?: Assignee;
  };

export function AssignInput({ onChange, label, required, error, className, defaultAssignee }: AssignInputProps) {
  const params = useParams();
  const dashboardId = Number(params.id);
  const [page, setPage] = useState(1);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedAssignee, setSelectedAssignee] = useState<Assignee | null>(defaultAssignee ?? null);
  const { data } = useMembersQuery({ dashboardId, page, size: PAGE_SIZE });
  const id = useId();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleInputClick = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleSelectItem = (member: Member) => {
    onChange(member.userId);
    setSelectedAssignee({ id: member.userId, nickname: member.nickname, profileImageUrl: member.profileImageUrl });
    setIsDropdownOpen(false);
  };

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
      <div ref={dropdownRef} className={cn(baseFieldClassName, 'relative flex h-auto min-h-[50px] items-center gap-2 px-4 py-2', error && baseErrorClassName, className)}>
        <div onClick={handleInputClick} className='flex w-full items-center gap-2'>
          {selectedAssignee?.id && <Avatar profileImageUrl={selectedAssignee.profileImageUrl} nickname={selectedAssignee.nickname} className='h-8 w-8' />}
          <input
            type='text'
            id={id}
            value={selectedAssignee?.nickname || ''}
            readOnly
            placeholder='담당자를 지정해 주세요'
            className={cn('flex flex-1 text-black focus-visible:outline-none', className)}
          />
        </div>

        <AnimatePresence>
          {isDropdownOpen && (
            <motion.ul
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className={cn(SCROLL_BAR_CLASS_NAME, 'absolute -left-1 -right-1 top-0 h-[270px] divide-y divide-gray-200 overflow-y-scroll rounded-md border border-gray-40 bg-white p-2 shadow-lg')}
            >
              <li className='mb-2 flex h-10 items-center justify-between px-2'>
                <div className='flex items-center gap-4'>
                  <PaginationWithCounter totalCount={data?.totalCount || 0} page={page} setPage={setPage} pageSize={PAGE_SIZE} />
                </div>

                <Image src={XIcon} alt='취소 버튼' width={24} height={24} className='cursor-pointer' onClick={() => setIsDropdownOpen(false)} />
              </li>
              {data?.members.map((member) => (
                <li key={member.id} className='flex h-16 cursor-pointer items-center gap-2 p-2 hover:bg-gray-100' onClick={() => handleSelectItem(member)}>
                  <Avatar email={member.email} profileImageUrl={member.profileImageUrl} />
                  <span className='text-gray-70'>{member.nickname}</span>
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
