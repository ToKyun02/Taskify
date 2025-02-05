import Image from 'next/image';
import { DEFAULT_COLORS } from '@/constants/colors';
import check_icon from '@/assets/icons/check.svg';
import ColorChip from './ColorChip';
import { cn } from '@/utils/helper';

/**
 * input name을 통한 radio group으로 구성된 컬러 피커 입니다.
 * Controller를 사용하여 `react-hook-form`과 `ColorPicker` 컴포넌트를 연결하시면 됩니다.
 * (name은 zod schema key값을 내려주면 됩니다.)
 *
 * @example
 * <Controller
 *   control={control}
 *   name='color'
 *   render={({ field }) => (
 *     <ColorPicker
 *       name='color'
 *       selected={field.value}
 *       onChange={(value) => field.onChange(value)}
 *     />
 *   )}
 * />
 */

interface ColorPickerProps {
  name: string;
  selected: string;
  onChange: (value: string) => void;
  className?: string;
}

export default function ColorPicker({ name = 'color', selected, onChange, className }: ColorPickerProps) {
  return (
    <div className={cn('flex flex-wrap gap-2 leading-none', className)}>
      {DEFAULT_COLORS.map((color) => (
        <label key={color} className='relative cursor-pointer'>
          <input type='radio' className='peer' name={name} value={color} hidden checked={selected === color} onChange={(e) => onChange(e.target.value)} />
          <ColorChip color={color} />
          <Image src={check_icon} alt='선택됨' className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity peer-checked:opacity-100' />
        </label>
      ))}
    </div>
  );
}
