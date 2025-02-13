'use client';

import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { isAxiosError } from 'axios';
import { Input } from '@/components/ui/Field/Input';
import { passwordSchema, PutPasswordFormData } from '@/apis/auth/types';
import { logout, putPassword } from '@/apis/auth';
import useAlert from '@/hooks/useAlert';
import { Card, CardTitle } from '@/components//ui/Card/Card';
import Button from '@/components/ui/Button/Button';
import { getErrorMessage } from '@/utils/errorMessage';

export default function PasswordEdit() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty, isSubmitting },
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
  const queryClient = useQueryClient();

  const onSubmit = async (putPasswordFormData: PutPasswordFormData) => {
    try {
      await putPassword(putPasswordFormData);
      alert('비밀번호가 변경되었습니다!');
      reset();
    } catch (error) {
      if (isAxiosError(error) && error?.status === 401) {
        await alert('세션이 만료되어 로그인 페이지로 이동합니다.');
        await logout();
        queryClient.invalidateQueries();
        router.replace('/login');
      } else {
        const message = getErrorMessage(error);
        alert(message);
      }
    }
  };

  const isDisabled = !isDirty || !isValid || isSubmitting;

  return (
    <Card>
      <CardTitle>비밀번호 변경</CardTitle>
      <form onSubmit={handleSubmit(onSubmit)} className='grid gap-6'>
        <Input //
          type='password'
          label='현재 비밀번호'
          placeholder='비밀번호 입력'
          error={errors.password?.message}
          required
          {...register('password')}
        />
        <Input //
          type='password'
          label='새 비밀번호'
          placeholder='새 비밀번호 입력'
          error={errors.newPassword?.message}
          required
          {...register('newPassword')}
        />
        <Input //
          type='password'
          label='새 비밀번호 확인'
          placeholder='새 비밀번호 입력'
          error={errors.newPasswordConfirm?.message}
          required
          {...register('newPasswordConfirm')}
        />
        <Button type='submit' disabled={isDisabled}>
          변경
        </Button>
      </form>
    </Card>
  );
}
