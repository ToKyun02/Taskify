'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Field from '@/components/auth/Field';
import SubmitButton from '@/components/auth/SubmitButton';
import { LOGIN_FORM_PLACEHOLDER } from '@/constants/auth';
import { loginSchema, LoginFormData } from '@/apis/auth/types';
import { login } from '@/apis/auth';
import useAlert from '@/hooks/useAlert';

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const alert = useAlert();

  const onSubmit = async (loginFormData: LoginFormData) => {
    const response = await login(loginFormData);
    if ('message' in response) {
      alert(response.message);
    } else {
      await alert('로그인이 완료되었습니다!');
      window.location.reload();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-1'>
      <Field label='이메일' type='email' placeholder={LOGIN_FORM_PLACEHOLDER.EMAIL} register={register('email')} errorMessage={errors.email?.message} />
      <Field label='비밀번호' type='password' placeholder={LOGIN_FORM_PLACEHOLDER.PASSWORD} register={register('password')} errorMessage={errors.password?.message} />
      <SubmitButton text='로그인' isValid={isValid} isSubmitting={isSubmitting} />
    </form>
  );
}
