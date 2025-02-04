import OpendEyeIcon from '@/assets/icons/opend_eye.svg';
import ClosedEyeIcon from '@/assets/icons/closed_eye.svg';
import Image from 'next/image';
import { useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

type Input = 'text' | 'email' | 'password';

interface FieldProps {
  label: string;
  type: Input;
  placeholder?: string;
  errorMessage?: string;
  register: UseFormRegisterReturn;
}

interface PasswrodType {
  type: Input;
  icon: string;
}

export default function Field({ label, type, placeholder = '', register, errorMessage }: FieldProps) {
  const [passwordType, setPasswordType] = useState<PasswrodType>({ type, icon: ClosedEyeIcon });

  const togglePassword = () => {
    setPasswordType((prev) => {
      return prev.icon === ClosedEyeIcon ? { type: 'text', icon: OpendEyeIcon } : { type: 'password', icon: ClosedEyeIcon };
    });
  };

  return (
    <div className='flex flex-col gap-2'>
      <label className='relative flex flex-col gap-2 text-gray-70'>
        <span>{label}</span>
        <input type={type !== 'password' ? type : passwordType.type} placeholder={placeholder} className='rounded-lg border p-4 text-gray-70' {...register} />
        {label.includes('비밀번호') && <Image src={passwordType.icon} alt='비밀번호 숨김 아이콘' width={24} height={24} onClick={togglePassword} className='absolute right-4 top-12 cursor-pointer' />}
      </label>
      {errorMessage && <span className='text-md text-red'>{errorMessage}</span>}
    </div>
  );
}
