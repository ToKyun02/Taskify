import { z } from 'zod';
import { SIGNUP_FORM_VALID_LENGTH, SIGNUP_FORM_ERROR_MESSAGE } from '@/constants/auth';
import { PROFILEEDIT_FORM_VALID_LENGTH, PROFILEEDIT_FORM_ERROR_MESSAGE } from '@/constants/user';

interface FailResponse {
  message: string;
}

export const signupSchema = z
  .object({
    email: z.string().min(SIGNUP_FORM_VALID_LENGTH.EMAIL.MIN, SIGNUP_FORM_ERROR_MESSAGE.EMAIL.MIN).email(SIGNUP_FORM_ERROR_MESSAGE.EMAIL.NOT_FORM),
    nickname: z.string().trim().min(SIGNUP_FORM_VALID_LENGTH.NICKNAME.MIN, SIGNUP_FORM_ERROR_MESSAGE.NICKNAME.MIN).max(SIGNUP_FORM_VALID_LENGTH.NICKNAME.MAX, SIGNUP_FORM_ERROR_MESSAGE.NICKNAME.MAX),
    password: z.string().trim().min(SIGNUP_FORM_VALID_LENGTH.PASSWORD.MIN, SIGNUP_FORM_ERROR_MESSAGE.PASSWORD.MIN),
    passwordConfirm: z.string().trim(),
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

export const userSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  nickname: z.string(),
  profileImageUrl: z.union([z.string().url(), z.null()]),
  createdAt: z.union([z.string(), z.date()]),
  updatedAt: z.union([z.string(), z.date()]),
});

export type User = z.infer<typeof userSchema>;

export type SignupSuccessResponse = z.infer<typeof userSchema>;

export type SignupFailResponse = FailResponse;

export type SignupResponse = Promise<SignupSuccessResponse | SignupFailResponse>;

const profileImageUrlSchema = z
  .instanceof(File)
  .refine((file) => ['image/jpeg', 'image/jpg', 'image/png', 'image/ico'].includes(file.type), {
    message: PROFILEEDIT_FORM_ERROR_MESSAGE.IMAGE.TYPE,
  })
  .refine((file) => file.size < 2 * 1024 * 1024, { message: `2${PROFILEEDIT_FORM_ERROR_MESSAGE.IMAGE.SIZE}` });

export const updateUserFormSchema = z.object({
  nickname: z.string().max(PROFILEEDIT_FORM_VALID_LENGTH.NICKNAME.MAX, PROFILEEDIT_FORM_ERROR_MESSAGE.NICKNAME.MAX),
  profileImageUrl: z.union([z.string().url(), profileImageUrlSchema]).optional().nullable(),
});

export type UpdateUserForm = z.infer<typeof updateUserFormSchema>;

export const createProfileImageFormSchema = z.object({
  image: profileImageUrlSchema,
});

export interface CreateProfileImageForm {
  image: File;
}

export const profileImageUrlResponseSchema = z.object({
  profileImageUrl: z.string().url(),
});

export type ProfileImageUrlResponse = z.infer<typeof profileImageUrlResponseSchema>;
