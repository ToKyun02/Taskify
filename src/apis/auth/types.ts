import { z } from 'zod';
import { LOGIN_FORM_VALID_LENGTH, LOGIN_FORM_ERROR_MESSAGE } from '@/constants/auth';
import { User } from '@/apis/users/types';

export const loginSchema = z.object({
  email: z.string().min(LOGIN_FORM_VALID_LENGTH.EMAIL.MIN, LOGIN_FORM_ERROR_MESSAGE.EMAIL.MIN).email(LOGIN_FORM_ERROR_MESSAGE.EMAIL.NOT_FORM),
  password: z.string().min(LOGIN_FORM_VALID_LENGTH.PASSWORD.MIN, LOGIN_FORM_ERROR_MESSAGE.PASSWORD.MIN),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export interface LoginSuccessResponse {
  user: User;
  accessToken: string;
}

export interface LoginFailResponse {
  message: string;
}

export type LoginResponse = Promise<LoginSuccessResponse | LoginFailResponse>;
