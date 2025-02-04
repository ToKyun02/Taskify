'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Field from '@/components/auth/Field';
import SubmitButton from '@/components/auth/SubmitButton';
import Checkbox from './Checkbox';
import { SIGNUP_FORM_PLACEHOLDER } from '@/constants/auth';
import { signupSchema, SignupFormData } from '@/apis/users/types';

export default function SignupForm() {
  const {
    register,
    trigger,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(signupSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      nickname: '',
      password: '',
      passwordConfirm: '',
      terms: false,
    },
  });
  const onSubmit = (signupFormData: SignupFormData) => {
    // TODO : 디버깅 용으로 남겼습니다. API 함수 구현이 완료되면 로직 수정 예정입니다.
    console.log(signupFormData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6'>
      <Field label='이메일' type='email' placeholder={SIGNUP_FORM_PLACEHOLDER.EMAIL} register={register('email')} errorMessage={errors.email?.message} />
      <Field label='닉네임' type='text' placeholder={SIGNUP_FORM_PLACEHOLDER.NICKNAME} register={register('nickname')} errorMessage={errors.nickname?.message} />
      <Field
        label='비밀번호'
        type='password'
        placeholder={SIGNUP_FORM_PLACEHOLDER.PASSWORD}
        register={register('password', {
          onBlur: () => trigger('passwordConfirm'),
        })}
        errorMessage={errors.password?.message}
      />
      <Field label='비밀번호 확인' type='password' placeholder={SIGNUP_FORM_PLACEHOLDER.PASSWORD_CONFIRM} register={register('passwordConfirm')} errorMessage={errors.passwordConfirm?.message} />
      <Checkbox
        register={register('terms', {
          onChange: () => trigger('terms'),
        })}
        errorMessage={errors.terms?.message}
      />
      <SubmitButton text='가입하기' isValid={isValid} />
    </form>
  );
}
