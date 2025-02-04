'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Field from '@/components/auth/Field';
import { SIGNUP_FORM_PLACEHOLDER, SINGUP_FORM_VALID_LENGTH, SIGNUP_FORM_ERROR_MESSAGE } from '@/constants/auth';
import { useForm } from 'react-hook-form';
//TODO: 회원가입 폼 레이아웃 및 validation 작업

//TODO: API 함수 구현 후 스키마와 타입 정의 옮길 예정
const signupSchema = z
  .object({
    email: z.string().min(SINGUP_FORM_VALID_LENGTH.EMAIL.MIN, SIGNUP_FORM_ERROR_MESSAGE.EMAIL.MIN).email(SIGNUP_FORM_ERROR_MESSAGE.EMAIL.NOT_FORM),
    nickname: z.string().min(SINGUP_FORM_VALID_LENGTH.NICKNAME.MIN, SIGNUP_FORM_ERROR_MESSAGE.NICKNAME.MIN).max(SINGUP_FORM_VALID_LENGTH.NICKNAME.MAX, SIGNUP_FORM_ERROR_MESSAGE.NICKNAME.MAX),
    password: z.string().min(SINGUP_FORM_VALID_LENGTH.PASSWORD.MIN, SIGNUP_FORM_ERROR_MESSAGE.PASSWORD.MIN),
    passwordConfirm: z.string(),
    terms: z.boolean(),
  })
  .refine((check) => check.password === check.passwordConfirm, {
    message: SIGNUP_FORM_ERROR_MESSAGE.PASSWORD_CONFIRM.NOT_MATCH,
    path: ['passwordConfirm'],
  })
  .refine((check) => check.terms === true, {
    message: SIGNUP_FORM_ERROR_MESSAGE.TERMS.NOT_TOS,
    path: ['terms'],
  });

type SignupFormData = z.infer<typeof signupSchema>;

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
      {/* TODO: 체크박스 및 버튼 컴포넌트 분리 예정*/}
      <label className='flex items-center text-sm text-gray-700'>
        <input type='checkbox' {...register('terms')} />
        <span>이용약관에 동의합니다.</span>
      </label>
      {errors.terms && <span className='text-md text-red'>{errors.terms.message}</span>}

      <button disabled={!isValid} className={`rounded-lg ${isValid ? 'cursor-pointer bg-violet-20' : 'cursor-not-allowed bg-gray-40'} py-3 text-2lg font-medium text-white`}>
        가입하기
      </button>
    </form>
  );
}
