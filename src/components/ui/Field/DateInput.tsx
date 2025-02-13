import { InputHTMLAttributes, useId } from 'react';
import Image from 'next/image';
import DatePicker from 'react-datepicker';
import { cn } from '@/utils/helper';
import { BaseError, baseErrorClassName, baseFieldClassName, BaseItem, BaseLabel } from './Base';
import calendarIcon from '@/assets/icons/calendar.svg';
import { BaseField } from './types';
import 'react-datepicker/dist/react-datepicker.css';

type DateInputProps = BaseField &
  Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> & {
    value: Date;
    onChange: (value: Date | null) => void;
  };

export function DateInput({ label, error, value, onChange, onBlur, placeholder, required, className, disabled, readOnly }: DateInputProps) {
  const id = useId();

  return (
    <BaseItem>
      {label && (
        <BaseLabel required={required} htmlFor={id}>
          {label}
        </BaseLabel>
      )}
      <div className='relative grid'>
        <Image src={calendarIcon} alt='날짜선택' className={cn('pointer-events-none absolute left-4 top-1/2 z-20 h-auto w-4 -translate-y-1/2 opacity-50', value && 'opacity-100')} />
        {/* TODO: DatePicker 스타일링 및 locale 설정 예정 */}
        <DatePicker //
          id={id}
          selected={value}
          onChange={onChange}
          onBlur={onBlur}
          className={cn(baseFieldClassName, 'p-4 pl-10', error && baseErrorClassName, className)}
          dateFormat='yyyy. MM. dd HH:mm'
          minDate={new Date()}
          showTimeSelect
          timeFormat='HH:mm'
          timeIntervals={5}
          placeholderText={placeholder}
          disabled={disabled}
          readOnly={readOnly}
        />
      </div>
      {error && <BaseError>{error}</BaseError>}
    </BaseItem>
  );
}
