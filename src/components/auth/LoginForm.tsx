'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useAlert from '@/hooks/useAlert';
import { loginSchema, LoginFormData } from '@/apis/auth/types';
import Field from '@/components/auth/Field';
import SubmitButton from '@/components/auth/SubmitButton';
import { LOGIN_FORM_PLACEHOLDER } from '@/constants/auth';
import { loginAction } from '@/actions/login';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();

  const onSubmit = async (loginFormData: LoginFormData) => {
    const result = await loginAction(loginFormData);
    if (result.success) {
      await alert(result.message);
      router.push('/mydashboard');
    } else {
      alert(result.message);
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
