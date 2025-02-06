'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Field from '@/components/auth/Field';
import SubmitButton from '@/components/auth/SubmitButton';
import { LOGIN_FORM_PLACEHOLDER } from '@/constants/auth';
import { loginSchema, LoginFormData } from '@/apis/auth/types';
import { login } from '@/apis/auth';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/stores/useAuthStore';

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

  const router = useRouter();
  const { setAccessToken } = useAuthStore();

  const onSubmit = async (loginFormData: LoginFormData) => {
    const response = await login(loginFormData);
    // TODO: 디버깅 용으로 alert로 구현했습니다. 모달 기능 구현 후 로직 수정 예정입니다.
    if ('message' in response) {
      alert(response.message);
    } else {
      alert('로그인이 완료되었습니다!');
      setAccessToken(response.accessToken);
      router.replace('/mydashboard');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6'>
      <Field label='이메일' type='email' placeholder={LOGIN_FORM_PLACEHOLDER.EMAIL} register={register('email')} errorMessage={errors.email?.message} />
      <Field label='비밀번호' type='password' placeholder={LOGIN_FORM_PLACEHOLDER.PASSWORD} register={register('password')} errorMessage={errors.password?.message} />
      <SubmitButton text='로그인' isValid={isValid} isSubmitting={isSubmitting} />
    </form>
  );
}
