import { forwardRef, TextareaHTMLAttributes, useId } from 'react';
import { cn } from '@/utils/helper';
import { BaseError, baseErrorClassName, baseFieldClassName, BaseItem, BaseLabel } from './Base';
import { BaseField } from './types';

type TextareaProps = BaseField & TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({ label, error, className, ...props }, ref) => {
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
});

Textarea.displayName = 'Textarea';
