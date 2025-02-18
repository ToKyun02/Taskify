'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useAlert from '@/hooks/useAlert';
import { passwordSchema, PutPasswordFormData } from '@/apis/auth/types';
import { usePutPassword } from '@/apis/auth/queries';
import { getErrorMessage } from '@/utils/network/errorMessage';
import { Input } from '@/components/ui/Field/Input';
import { Card, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';

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
  const { mutateAsync: putPassword } = usePutPassword();

  const onSubmit = async (putPasswordFormData: PutPasswordFormData) => {
    try {
      await putPassword(putPasswordFormData);
      alert('비밀번호가 변경되었습니다!');
      reset();
    } catch (error) {
      const message = getErrorMessage(error);
      alert(message);
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
