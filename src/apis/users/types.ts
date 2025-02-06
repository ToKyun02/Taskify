import { z } from 'zod';
import { SINGUP_FORM_VALID_LENGTH, SIGNUP_FORM_ERROR_MESSAGE } from '@/constants/auth';

export const signupSchema = z
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
  .refine((check) => check.terms, {
    message: SIGNUP_FORM_ERROR_MESSAGE.TERMS.NOT_TOS,
    path: ['terms'],
  });

export type SignupFormData = z.infer<typeof signupSchema>;

export interface User {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string | null;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export type SignupSuccessResponse = User;

export interface SignupFailResponse {
  message: string;
}

export type SignupResponse = Promise<SignupSuccessResponse | SignupFailResponse>;
