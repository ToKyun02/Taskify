import { forwardRef, InputHTMLAttributes } from 'react';
import { cn } from '@/utils/helper';
import { BaseError, baseErrorClassName, baseFieldClassName, BaseItem, BaseLabel } from './Base';
import { BaseField } from './types';

type InputProps = BaseField & InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(({ label, error, className, ...props }, ref) => {
  return (
    <BaseItem>
      {label && <BaseLabel required={props.required}>{label}</BaseLabel>}
      <input {...props} className={cn(baseFieldClassName, error && baseErrorClassName, className)} ref={ref} />
      {error && <BaseError>{error}</BaseError>}
    </BaseItem>
  );
});

Input.displayName = 'Input';
