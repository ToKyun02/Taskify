import { useState } from 'react';
import Image from 'next/image';
import { UseFormRegisterReturn } from 'react-hook-form';
import { isEmpty } from 'es-toolkit/compat';
import OpendEyeIcon from '@/assets/icons/opend_eye.svg';
import ClosedEyeIcon from '@/assets/icons/closed_eye.svg';

type Input = 'text' | 'email' | 'password';

interface FieldProps {
  label: string;
  type: Input;
  placeholder?: string;
  errorMessage?: string;
  register: UseFormRegisterReturn;
}

interface PasswordState {
  type: 'password' | 'text';
  icon: string;
}

const Field = ({ label, type, placeholder = '', register, errorMessage }: FieldProps) => {
  const [passwordState, setPasswordState] = useState<PasswordState>({
    type: 'password',
    icon: ClosedEyeIcon,
  });

  const togglePasswordVisibility = () => {
    setPasswordState((prev) => ({
      type: prev.type === 'password' ? 'text' : 'password',
      icon: prev.type === 'password' ? OpendEyeIcon : ClosedEyeIcon,
    }));
  };

  const inputType = type === 'password' ? passwordState.type : type;

  return (
    <div className='flex flex-col gap-2'>
      <label className='relative flex flex-col gap-2 text-gray-70'>
        <span>{label}</span>
        <input
          type={inputType}
          placeholder={placeholder}
          className={`rounded-lg border p-4 text-gray-70 ${!isEmpty(errorMessage) ? 'border-1 border-red outline-red' : 'outline-violet-20'}`}
          {...register}
        />
        {type === 'password' && (
          <Image src={passwordState.icon} alt='비밀번호 숨김 아이콘' width={24} height={24} onClick={togglePasswordVisibility} className='absolute right-4 top-12 cursor-pointer' />
        )}
      </label>
      {<span className='h-6 text-md text-red'>{errorMessage}</span>}
    </div>
  );
};

export default Field;
