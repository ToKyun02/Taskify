'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import RoundChip from '@/components/ui/Chip/RoundChip';
import check from '@/assets/icons/check_gray.svg';

interface Column {
  id: number;
  title: string;
}

interface StatusDropdownProps {
  columns: Column[];
  selectedColumn: Column | undefined;
  onChange: (columnId: number) => void;
}

export default function StatusDropdown({ columns, selectedColumn, onChange }: StatusDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClickColumn = (columnId: number) => {
    onChange(columnId);
    setIsOpen(false);
  };

  return (
    <div className='flex flex-col gap-2 md:gap-2.5'>
      <label className='text-md font-medium text-gray-70 md:text-2lg'>상태</label>
      <div className='relative h-12 w-full cursor-pointer rounded-md border px-[9px] py-2 md:w-[217px]' onClick={() => setIsOpen((prev) => !prev)} ref={dropdownRef}>
        <RoundChip label={selectedColumn?.title || '상태 선택'} />

        {isOpen && (
          <motion.ul
            initial={{ scale: 0.8, y: -20 }}
            animate={{ scale: 1, y: 0 }}
            className='absolute left-0 top-[110%] z-10 flex w-full flex-col items-start gap-2 rounded-md border border-gray-30 bg-white p-[4px] pl-4'
          >
            {columns.map((column) => (
              <li
                key={column.id}
                className='group flex w-full cursor-pointer items-center gap-2'
                onClick={(e) => {
                  e.stopPropagation();
                  handleClickColumn(column.id);
                }}
              >
                <Image src={check} alt='check icon' width={16} height={16} className='opacity-0 transition-opacity duration-200 group-hover:opacity-100' />
                <RoundChip label={column.title} />
              </li>
            ))}
          </motion.ul>
        )}
      </div>
    </div>
  );
}
