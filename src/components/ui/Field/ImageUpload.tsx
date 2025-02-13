import { ChangeEvent, InputHTMLAttributes, useEffect, useId, useRef } from 'react';
import Image from 'next/image';
import { cn } from '@/utils/helper';
import { BaseError, BaseItem, BaseLabel } from './Base';
import { BaseField } from './types';
import deleteIcon from '@/assets/icons/x_white.svg';
import addIcon from '@/assets/icons/plus.svg';

type ImageUploadProps = BaseField &
  Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'onBlur'> & {
    value: File | string | undefined;
    onChange: (file: File | undefined) => void;
    onBlur: () => void;
  };

export function ImageUpload({ value, onChange, onBlur, label, required, error, className }: ImageUploadProps) {
  const preview = value instanceof File ? URL.createObjectURL(value) : value;
  const fileRef = useRef<HTMLInputElement>(null);
  const id = useId();

  useEffect(() => {
    return () => {
      if (preview && value instanceof File) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview, value]);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;

    const files = e.target.files;
    onChange(files[0]);
    onBlur();

    if (fileRef.current) {
      fileRef.current.value = '';
    }
  }

  function handleRemove() {
    if (fileRef.current) {
      fileRef.current.value = '';
    }

    onChange(undefined);
  }

  return (
    <BaseItem>
      {label && (
        <BaseLabel required={required} htmlFor={id}>
          {label}
        </BaseLabel>
      )}
      <div className={cn('relative aspect-square w-[76px]', className)}>
        <label className='relative flex h-full w-full cursor-pointer items-center justify-center overflow-hidden rounded-md bg-gray-10'>
          {preview ? <Image src={preview} alt='thumbnail' fill sizes='40vw' className='absolute h-full w-full object-cover' /> : <Image src={addIcon} className='h-auto w-[18px]' alt='업로드' />}
          <input id={id} type='file' accept='image/jpeg, image/png, image/ico, image/jpg' ref={fileRef} onChange={handleChange} className='sr-only' />
        </label>
        {preview && (
          <button type='button' className='absolute -right-1 -top-1 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-black' onClick={handleRemove}>
            <Image src={deleteIcon} alt='삭제' />
          </button>
        )}
      </div>
      {error && <BaseError>{error}</BaseError>}
    </BaseItem>
  );
}
