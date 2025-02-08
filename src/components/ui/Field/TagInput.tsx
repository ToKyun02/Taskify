import { FocusEvent, InputHTMLAttributes, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/utils/helper';
import TagChip from '../Chip/TagChip';
import { BaseError, baseErrorClassName, baseFieldClassName, BaseItem, BaseLabel } from './Base';
import { BaseField } from './types';

type TagInputProps = BaseField &
  Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> & {
    value: string[];
    onChange: (value: string[]) => void;
  };

export function TagInput({ label, error, value, onChange, className, placeholder, onBlur, required }: TagInputProps) {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) return;

    const input = e.currentTarget;
    const tag = input.value.trim();

    if (e.key === 'Enter') {
      e.preventDefault();

      if (tag) {
        const newTags = new Set([...value, tag]);
        onChange(Array.from(newTags));
        input.value = '';
      }
    }

    if (e.key === 'Backspace' && value.length > 0 && !tag.length) {
      e.preventDefault();

      const newTags = [...value];
      newTags.pop();
      onChange(newTags);
    }
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    onBlur?.(e);
    setFocused(false);
  };

  useEffect(() => {
    if (focused) {
      inputRef.current?.focus();
    }
  }, [focused]);

  return (
    <BaseItem>
      {label && <BaseLabel required={required}>{label}</BaseLabel>}
      <div className={cn(baseFieldClassName, 'flex h-auto min-h-[50px] flex-wrap items-center gap-2 px-4 py-2', error && baseErrorClassName, className)} onClick={() => setFocused(true)}>
        {value.map((item) => (
          <motion.div //
            key={item}
            animate={{ scale: 1 }}
            initial={{ scale: 0 }}
          >
            <TagChip label={item} />
          </motion.div>
        ))}
        {(value.length === 0 || focused) && (
          <input //
            ref={inputRef}
            className='flex flex-1 focus-visible:outline-none'
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            placeholder={placeholder}
          />
        )}
      </div>
      {error && <BaseError>{error}</BaseError>}
    </BaseItem>
  );
}
