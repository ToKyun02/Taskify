import { forwardRef, InputHTMLAttributes, useId } from 'react';
import { cn } from '@/utils/helper';
import { BaseError, baseErrorClassName, baseFieldClassName, BaseItem, BaseLabel } from '@/components/ui/Field/Base';
import { BaseField } from '@/components/ui/Field/types';

type InputProps = BaseField & InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(({ label, error, className, ...props }, ref) => {
  const id = useId();

  return (
    <BaseItem>
      {label && (
        <BaseLabel required={props.required} htmlFor={id}>
          {label}
        </BaseLabel>
      )}
      <input id={id} {...props} className={cn(baseFieldClassName, error && baseErrorClassName, className)} ref={ref} />
      {error && <BaseError>{error}</BaseError>}
    </BaseItem>
  );
});

Input.displayName = 'Input';
