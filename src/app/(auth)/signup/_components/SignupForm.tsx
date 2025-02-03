'use client';

import Field from '@/components/auth/Field';
import { SIGNUP_FORM_PLACEHOLDER } from '@/constants/auth';
//TODO: 회원가입 폼 레이아웃 및 validation 작업
export default function SignupForm() {
  return (
    <form>
      <Field label='이메일' type='email' placeholder={SIGNUP_FORM_PLACEHOLDER.EMAIL} />
      <Field label='닉네임' type='text' placeholder={SIGNUP_FORM_PLACEHOLDER.NICKNAME} />
      <Field label='비밀번호' type='password' placeholder={SIGNUP_FORM_PLACEHOLDER.PASSWORD} />
      <Field label='비밀번호 확인' type='password' placeholder={SIGNUP_FORM_PLACEHOLDER.PASSWORD_CONFIRM} />
    </form>
  );
}
