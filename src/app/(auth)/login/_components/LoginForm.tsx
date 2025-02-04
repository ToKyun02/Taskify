'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Field from '@/components/auth/Field';
import SubmitButton from '@/components/auth/SubmitButton';
import { LOGIN_FORM_ERROR_MESSAGE, LOGIN_FORM_PLACEHOLDER, LOGIN_FORM_VALID_LENGTH } from '@/constants/auth';

//TODO: API 함수 구현 후 스키마와 타입 정의 옮길 예정
const loginSchema = z.object({
  email: z.string().min(LOGIN_FORM_VALID_LENGTH.EMAIL.MIN, LOGIN_FORM_ERROR_MESSAGE.EMAIL.MIN).email(LOGIN_FORM_ERROR_MESSAGE.EMAIL.NOT_FORM),
  password: z.string().min(LOGIN_FORM_VALID_LENGTH.PASSWORD.MIN, LOGIN_FORM_ERROR_MESSAGE.PASSWORD.MIN),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const onSubmit = (loginFormData: LoginFormData) => {
    // TODO : 디버깅 용으로 남겼습니다. API 함수 구현이 완료되면 로직 수정 예정입니다.
    console.log(loginFormData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6'>
      <Field label='이메일' type='email' placeholder={LOGIN_FORM_PLACEHOLDER.EMAIL} register={register('email')} errorMessage={errors.email?.message} />
      <Field label='비밀번호' type='password' placeholder={LOGIN_FORM_PLACEHOLDER.PASSWORD} register={register('password')} errorMessage={errors.password?.message} />
      <SubmitButton text='로그인' isValid={isValid} />
    </form>
  );
}
