'use client';

import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useAlert from '@/hooks/useAlert';
import { UpdateUserForm, updateUserFormSchema, User } from '@/apis/users/types';
import { useCreateProfileImage, useUpdateUser } from '@/apis/users/queries';
import { getErrorMessage } from '@/utils/network/errorMessage';
import { Input } from '@/components/ui/Field/Input';
import { ImageUpload } from '@/components/ui/Field/ImageUpload';
import Button from '@/components/ui/Button';
import { Card, CardTitle } from '@/components/ui/Card';

type ProfileEditProps = {
  user: User;
};

export default function ProfileEdit({ user }: ProfileEditProps) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors, isSubmitting, isValid, isDirty },
  } = useForm<UpdateUserForm>({
    resolver: zodResolver(updateUserFormSchema),
    mode: 'onChange',
    defaultValues: {
      nickname: user.nickname,
      profileImageUrl: user.profileImageUrl,
    },
  });
  const router = useRouter();
  const alert = useAlert();
  const { mutateAsync: update } = useUpdateUser();
  const { mutateAsync: createProfileImage } = useCreateProfileImage();

  const resetProfileImage = () => {
    setValue('profileImageUrl', null, {
      shouldDirty: true,
    });
  };

  const onSubmit = async (formData: UpdateUserForm) => {
    try {
      const updatedFormData = { ...formData };
      if (formData.profileImageUrl instanceof File) {
        const uploadedUrl = await createProfileImage({ image: formData.profileImageUrl });
        updatedFormData.profileImageUrl = uploadedUrl.profileImageUrl;
      }

      const data = await update(updatedFormData);
      reset({
        nickname: data.nickname,
        profileImageUrl: data.profileImageUrl,
      });

      alert('수정했습니다.');
      router.refresh();
    } catch (error) {
      const message = getErrorMessage(error);
      alert(message);
    }
  };

  const isDisabled = !isDirty || !isValid || isSubmitting;

  return (
    <Card>
      <CardTitle>프로필</CardTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='flex w-full flex-col gap-10 md:flex-row'>
          <div className='w-full max-w-44'>
            <Controller
              name='profileImageUrl'
              control={control}
              render={({ field, fieldState }) => {
                return (
                  <>
                    <ImageUpload //
                      error={errors.profileImageUrl?.message}
                      className='w-full'
                      defaultValue={user.profileImageUrl}
                      {...field}
                    />
                    {field.value && !fieldState.isDirty && (
                      <div className='mt-3 flex items-center'>
                        <Button type='button' variant='outline' size='sm' className='font-normal text-gray-50' onClick={resetProfileImage}>
                          프로필 이미지 초기화
                        </Button>
                      </div>
                    )}
                  </>
                );
              }}
            />
          </div>
          <div className='grid flex-1 gap-6'>
            <Input //
              label='이메일'
              placeholder='대시보드 이름을 입력해주세요'
              defaultValue={user.email}
              readOnly
            />

            <Input //
              label='닉네임'
              placeholder={'닉네임을 입력해주세요'}
              error={errors.nickname?.message}
              {...register('nickname')}
            />
            <Button type='submit' disabled={isDisabled}>
              저장
            </Button>
          </div>
        </div>
      </form>
    </Card>
  );
}
