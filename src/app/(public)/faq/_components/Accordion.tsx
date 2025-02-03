'use client';
import { createContext, PropsWithChildren, useContext, useState } from 'react';

interface AccordionContextType {
  selected: string;
  onSelect: (value: string) => void;
}

const AccordionContext = createContext<AccordionContextType | null>(null);
const AccordionItemContext = createContext<string | null>(null);

const useAccordion = () => {
  const ctx = useContext(AccordionContext);

  if (!ctx) {
    throw new Error('아코디언 컨텍스트는 아코디언 프로바이더 내부에서 사용가능합니다.');
  }

  return ctx;
};

const useAccordionItem = () => {
  const ctx = useContext(AccordionItemContext);

  if (!ctx) {
    throw new Error('아코디언 아이템 컨텍스트는 아코디언 아이템 프로바이더 내부에서 사용가능합니다.');
  }

  return ctx;
};

export function Accordion({ children }: PropsWithChildren) {
  const [selected, setSelected] = useState('');

  function handleSelect(value: string) {
    setSelected((prev) => (prev === value ? '' : value));
  }

  return <AccordionContext.Provider value={{ selected, onSelect: handleSelect }}>{children}</AccordionContext.Provider>;
}

export function AccordionItem({ children, value }: PropsWithChildren<{ value: string }>) {
  return (
    <AccordionItemContext.Provider value={value}>
      <div className='border-b border-white/20'>{children}</div>
    </AccordionItemContext.Provider>
  );
}

export function AccordionTrigger({ children }: PropsWithChildren) {
  const { selected, onSelect } = useAccordion();
  const value = useAccordionItem();

  return (
    <button onClick={() => onSelect(value)} className='relative flex w-full items-center py-6'>
      {children}
      <span
        className={`absolute right-1 top-[50%] h-3 w-3 shrink-0 border-b-2 border-r-2 transition-transform duration-200 ${selected === value ? '-translate-y-2 rotate-[225deg]' : '-translate-y-2 rotate-45'}`}
      />
    </button>
  );
}

export function AccordionContent({ children }: PropsWithChildren) {
  const { selected } = useAccordion();
  const value = useAccordionItem();

  return (
    <div className={`grid overflow-hidden transition-all ${selected === value ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
      <div className='overflow-hidden'>
        <div className='mb-4 break-keep rounded-md bg-gray-80 p-6'>{children}</div>
      </div>
    </div>
  );
}
