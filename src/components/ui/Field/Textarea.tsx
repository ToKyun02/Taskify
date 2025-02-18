import { Ref, TextareaHTMLAttributes, useId } from 'react';
import { cn } from '@/utils/helper';
import { BaseError, baseErrorClassName, baseFieldClassName, BaseItem, BaseLabel } from '@/components/ui/Field/Base';
import { BaseField } from '@/components/ui/Field/types';

type TextareaProps = BaseField &
  TextareaHTMLAttributes<HTMLTextAreaElement> & {
    ref?: Ref<HTMLTextAreaElement>;
  };

export function Textarea({ label, error, className, ref, ...props }: TextareaProps) {
  const id = useId();

  return (
    <BaseItem>
      {label && (
        <BaseLabel required={props.required} htmlFor={id}>
          {label}
        </BaseLabel>
      )}
      <textarea id={id} {...props} className={cn(baseFieldClassName, 'h-[126px] resize-none', error && baseErrorClassName, className)} ref={ref} />
      {error && <BaseError>{error}</BaseError>}
    </BaseItem>
  );
}
