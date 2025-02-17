'use client';

import React, { useState, useEffect, useRef, ReactNode } from 'react';
import Image from 'next/image';
import KebabIcon from '@/assets/icons/kebab.svg';
import DropdownArrow from '@/assets/icons/drop_down_arrow.svg';
import Check from '@/assets/icons/check_gray.svg';
import { cn } from '@/utils/helper';

interface DropdownOption {
  value: string;
  label?: string;
  component?: ReactNode;
}

interface DropdownProps {
  defaultValue?: DropdownOption;
  options: DropdownOption[];
  placeholder?: string;
  type?: 'kebab' | 'status' | 'search';
  onSelect?: (value: string) => void;
}

export default function Dropdown({ defaultValue, options, placeholder = '이름을 입력해 주세요', type = 'status', onSelect }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedValue, setSelectedValue] = useState<DropdownOption | null>(defaultValue || null);
  const [isInputMode, setIsInputMode] = useState(true);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredOptions = type === 'search' ? options.filter((option) => (option.label || '').toLowerCase().includes(searchTerm.toLowerCase())) : options;

  const handleSelect = (option: DropdownOption) => {
    setSelectedValue(option);
    setSearchTerm(option.label || '');
    onSelect?.(option.value);
    setIsOpen(false);
    setIsInputMode(false);
  };

  const handleReset = () => {
    setSelectedValue(null);
    setSearchTerm('');
    setIsInputMode(true);
  };

  // 드롭다운 영역 외부 클릭 감지
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className='relative flex items-center' ref={dropdownRef}>
      {/* 드롭다운 버튼 */}
      {type === 'search' ? (
        <div className='relative flex h-[48px] w-full items-center justify-between rounded-lg border border-gray-30 bg-white px-[16px] py-[8px] sm:w-[217px]'>
          {isInputMode ? (
            <input
              type='text'
              className='w-full text-gray-70 placeholder:text-gray-40 focus:outline-none'
              placeholder={placeholder}
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setIsOpen(true);
              }}
              onFocus={() => setIsOpen(true)}
            />
          ) : (
            <div className='flex w-full items-center justify-between text-gray-70'>
              {selectedValue?.component || selectedValue?.label}
              <button onClick={handleReset} className='mr-4 flex h-[22px] w-[22px] items-center justify-center rounded-full bg-gray-20'>
                <span className='text-sm text-gray-40'>X</span>
              </button>
            </div>
          )}
          <Image src={DropdownArrow} alt='드롭다운 메뉴 열기' width={8} height={5} className='cursor-pointer' onClick={() => setIsOpen(!isOpen)} />
        </div>
      ) : type === 'kebab' ? (
        <button onClick={() => setIsOpen(!isOpen)} className='flex h-8 w-8 items-center justify-center rounded-sm hover:bg-gray-10'>
          <Image src={KebabIcon} alt='메뉴' width={3} height={24} />
        </button>
      ) : (
        <button
          className='flex h-[48px] w-[217px] items-center justify-between rounded-lg border border-gray-30 bg-white px-4 py-2 text-left text-gray-70 focus:outline-none'
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedValue?.component || selectedValue?.label || placeholder}
          <Image src={DropdownArrow} alt='드롭다운 메뉴 열기' width={8} height={5} />
        </button>
      )}

      {/* 드롭다운 메뉴 */}
      {isOpen && (
        <div className={cn('absolute right-0 top-full z-50 mt-1 w-full rounded-lg border border-gray-30 bg-white p-[7px] shadow-lg', type === 'kebab' && 'mt-0 w-auto')}>
          <ul className='max-h-48'>
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <li
                  key={option.value}
                  className={`flex cursor-pointer items-center justify-between rounded-[4px] px-4 py-2 text-[16px] text-gray-70 hover:bg-violet-10 hover:text-violet-20 ${type === 'kebab' ? 'py-1 text-[14px]' : ''}`}
                  onClick={() => handleSelect(option)}
                >
                  <div className='flex items-center gap-2'>
                    {type !== 'kebab' && <div className='w-[22px]'>{selectedValue?.value === option.value && <Image src={Check} alt='선택됨' width={22} height={22} />}</div>}
                    {option.component || option.label || option.value}
                  </div>
                  {type === 'status' && <Image src={DropdownArrow} alt='드롭다운 메뉴' width={8} height={5} />}
                </li>
              ))
            ) : (
              <li className='px-4 py-2 text-gray-40'>검색 결과 없음</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
