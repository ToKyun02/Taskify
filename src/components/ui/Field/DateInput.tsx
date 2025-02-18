import { InputHTMLAttributes, useId } from 'react';
import Image from 'next/image';
import dayjs from 'dayjs';
import DatePicker, { ReactDatePickerCustomHeaderProps, registerLocale } from 'react-datepicker';
import { ko } from 'date-fns/locale/ko';
import { getMonth, getYear } from 'date-fns';
import { cn } from '@/utils/helper';
import { BaseError, baseErrorClassName, baseFieldClassName, BaseItem, BaseLabel } from '@/components/ui/Field/Base';
import arrowLeft from '@/assets/icons/circle_arrow_left.svg';
import arrowRight from '@/assets/icons/circle_arrow_right.svg';
import { BaseField } from '@/components/ui/Field/types';
import calendarIcon from '@/assets/icons/calendar.svg';
import 'react-datepicker/dist/react-datepicker.css';
import '@/assets/css/datepicker.css';

registerLocale('ko', ko);

type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

type DateInputProps = BaseField &
  Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> & {
    value: Date;
    onChange: (value: Date | null) => void;
  };

const getDayClassName = (date: Date) => {
  return dayjs(date).format('dddd').toLowerCase() as DayOfWeek;
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
          locale='ko'
          timeCaption='시간'
          dayClassName={getDayClassName}
          renderCustomHeader={(props) => <CustomHeader {...props} />}
        />
      </div>
      {error && <BaseError>{error}</BaseError>}
    </BaseItem>
  );
}

function CustomHeader({ date, decreaseMonth, increaseMonth, prevMonthButtonDisabled, nextMonthButtonDisabled }: ReactDatePickerCustomHeaderProps) {
  return (
    <div className='mb-2 flex h-10 items-center justify-between rounded-md border border-gray-20 px-4 py-2 shadow-[0_6px_12px_rgba(0,0,0,0.04)]'>
      <button type='button' className='text-xs disabled:opacity-30' onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
        <Image src={arrowLeft} alt='이전달' className='h-5 w-5' />
      </button>
      <div className='text-md font-medium'>
        {getYear(date)}년 {getMonth(date) + 1}월
      </div>
      <button type='button' className='text-xs disabled:opacity-30' onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
        <Image src={arrowRight} alt='다음달' className='h-5 w-5' />
      </button>
    </div>
  );
}
