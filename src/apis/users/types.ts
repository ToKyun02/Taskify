import { z } from 'zod';
import { SIGNUP_FORM_VALID_LENGTH, SIGNUP_FORM_ERROR_MESSAGE } from '@/constants/auth';
import { PROFILEEDIT_FORM_VALID_LENGTH, PROFILEEDIT_FORM_ERROR_MESSAGE } from '@/constants/profileEdit';

interface FailResponse {
  message: string;
}

export const signupSchema = z
  .object({
    email: z.string().min(SIGNUP_FORM_VALID_LENGTH.EMAIL.MIN, SIGNUP_FORM_ERROR_MESSAGE.EMAIL.MIN).email(SIGNUP_FORM_ERROR_MESSAGE.EMAIL.NOT_FORM),
    nickname: z.string().min(SIGNUP_FORM_VALID_LENGTH.NICKNAME.MIN, SIGNUP_FORM_ERROR_MESSAGE.NICKNAME.MIN).max(SIGNUP_FORM_VALID_LENGTH.NICKNAME.MAX, SIGNUP_FORM_ERROR_MESSAGE.NICKNAME.MAX),
    password: z.string().min(SIGNUP_FORM_VALID_LENGTH.PASSWORD.MIN, SIGNUP_FORM_ERROR_MESSAGE.PASSWORD.MIN),
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

type ProfileImageUrl = string | URL | null;

export const updateUserFormSchema = z.object({
  nickname: z.string().max(PROFILEEDIT_FORM_VALID_LENGTH.NICKNAME.MAX, PROFILEEDIT_FORM_ERROR_MESSAGE.NICKNAME.MAX),
  profileImageUrl: z.string(),
});

export type UpdateUserForm = Omit<z.infer<typeof updateUserFormSchema>, 'profileImageUrl'> & {
  profileImageUrl: ProfileImageUrl;
};

const profileImageUrlSchema = z.instanceof(File).refine((file) => ['image/jpeg', 'image/jpg', 'image/png', 'image/svg+xml', 'image/ico'].includes(file.type), {
  message: '지원되지 않는 이미지 파일입니다.',
});

export const createProfileImageFormSchema = z.object({
  image: profileImageUrlSchema,
});

export interface CreateProfileImageForm {
  image: File;
}

export const profileImageUrlResponseSchema = z.object({
  profileImageUrl: z.union([z.string(), z.instanceof(URL)]),
});

export type ProfileImageUrlResponse = z.infer<typeof profileImageUrlResponseSchema>;
