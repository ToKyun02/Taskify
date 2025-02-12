'use client';

import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/Field/Input';
import { zodResolver } from '@hookform/resolvers/zod';
import { passwordSchema, PutPasswordFormData } from '@/apis/auth/types';
import { logout, putPassword } from '@/apis/auth';
import useAlert from '@/hooks/useAlert';
import { isError } from 'es-toolkit/compat';
import { isAxiosError } from 'axios';
import SubmitButton from '@/components/auth/SubmitButton';
import { useRouter } from 'next/navigation';

export default function PasswordEdit() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    resolver: zodResolver(passwordSchema),
    mode: 'onBlur',
    defaultValues: {
      password: '',
      newPassword: '',
      newPasswordConfirm: '',
    },
  });

  const alert = useAlert();
  const router = useRouter();

  const onSubmit = async (putPasswordFormData: PutPasswordFormData) => {
    try {
      await putPassword(putPasswordFormData);
      alert('비밀번호가 변경되었습니다!');
      reset();
    } catch (error) {
      if (isAxiosError(error)) {
        if (error?.status === 401) {
          await alert('세션이 만료되어 로그인 페이지로 이동합니다.');
          await logout();
          router.replace('/login');
          return;
        }

        alert(error.response?.data?.message ?? '알 수 없는 오류가 발생했습니다.');
      } else alert(isError(error) ? error.message : String(error));
    }
  };

  return (
    <div className='flex flex-col gap-4 rounded-2xl bg-white p-6'>
      <h2 className='text-2lg font-bold text-gray-70 md:text-2xl'>비밀번호 변경</h2>
      <form onSubmit={handleSubmit(onSubmit)} className='grid gap-6'>
        <Input label='현재 비밀번호' placeholder='비밀번호 입력' error={errors.password?.message} required {...register('password')} type='password' />
        <Input label='새 비밀번호' placeholder='새 비밀번호 입력' error={errors.newPassword?.message} required {...register('newPassword')} type='password' />
        <Input label='새 비밀번호 확인' placeholder='새 비밀번호 입력' error={errors.newPasswordConfirm?.message} required {...register('newPasswordConfirm')} type='password' />
        <SubmitButton isValid={isValid} isSubmitting={isSubmitting} text='변경' />
      </form>
    </div>
  );
}
