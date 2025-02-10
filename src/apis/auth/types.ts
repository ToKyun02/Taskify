import { z } from 'zod';
import { LOGIN_FORM_VALID_LENGTH, LOGIN_FORM_ERROR_MESSAGE, PASSWORD_PUT_FORM_VALID_LENGTH, PASSWORD_PUT_FORM_ERROR_MESSAGE } from '@/constants/auth';

export const loginSchema = z.object({
  email: z.string().min(LOGIN_FORM_VALID_LENGTH.EMAIL.MIN, LOGIN_FORM_ERROR_MESSAGE.EMAIL.MIN).email(LOGIN_FORM_ERROR_MESSAGE.EMAIL.NOT_FORM),
  password: z.string().min(LOGIN_FORM_VALID_LENGTH.PASSWORD.MIN, LOGIN_FORM_ERROR_MESSAGE.PASSWORD.MIN),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const loginResponseSchema = z.object({
  user: z.object({
    id: z.number(),
    email: z.string(),
    nickname: z.string(),
    profileImageUrl: z.union([z.string(), z.instanceof(URL), z.null()]),
    createdAt: z.union([z.string(), z.date()]),
    updatedAt: z.union([z.string(), z.date()]),
  }),
});

export type LoginSuccessResponse = z.infer<typeof loginResponseSchema>;

export const loginFailSchema = z.object({
  message: z.string(),
});

export type LoginFailResponse = z.infer<typeof loginFailSchema>;

export type LoginResponse = Promise<LoginSuccessResponse | LoginFailResponse>;

export const passwordSchema = z
  .object({
    password: z.string().min(PASSWORD_PUT_FORM_VALID_LENGTH.PASSWORD.MIN, PASSWORD_PUT_FORM_ERROR_MESSAGE.PASSWORD.MIN),
    newPassword: z.string().min(PASSWORD_PUT_FORM_VALID_LENGTH.NEW_PASSWORD.MIN, PASSWORD_PUT_FORM_ERROR_MESSAGE.NEW_PASSWORD.MIN),
    newPasswordConfrim: z.string(),
  })
  .refine((check) => check.newPassword === check.newPasswordConfrim, {
    message: PASSWORD_PUT_FORM_ERROR_MESSAGE.NEW_PASSWORD_CONFRIM.NOT_MATCH,
    path: ['newPasswordConfirm'],
  });

export type PutPasswordFormData = z.infer<typeof passwordSchema>;
