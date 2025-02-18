import { InputHTMLAttributes, Ref, useId } from 'react';
import { cn } from '@/utils/helper';
import { BaseError, baseErrorClassName, baseFieldClassName, BaseItem, BaseLabel } from '@/components/ui/Field/Base';
import { BaseField } from '@/components/ui/Field/types';

type InputProps = BaseField &
  InputHTMLAttributes<HTMLInputElement> & {
    ref?: Ref<HTMLInputElement>;
  };

export function Input({ label, error, className, ref, ...props }: InputProps) {
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
}
