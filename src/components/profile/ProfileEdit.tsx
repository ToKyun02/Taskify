'use client';

import { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getUser, updateUser, createProfileImage } from '@/apis/users/index';
import { UpdateUserForm, updateUserFormSchema } from '@/apis/users/types';
import { Input } from '@/components/ui/Field/Input';
import SubmitButton from '@/components/auth/SubmitButton';
import { ImageUpload } from '@/components/ui/Field/ImageUpload';
import useAlert from '@/hooks/useAlert';

export default function ProfileEdit() {
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [currentEmail, setCurrentEmail] = useState('');
  const [currentNickname, setCurrentNickname] = useState('');
  const [profileImageUrl, setProfileImageUrl] = useState<string>('');
  const [initialProfileImageUrl, setInitialProfileImageUrl] = useState<string>('');
  const [isFormChanged, setIsFormChanged] = useState(false);
  const [imageRemoved, setImageRemoved] = useState(false);

  const alert = useAlert();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors, isSubmitting, isValid },
  } = useForm<UpdateUserForm>({
    resolver: zodResolver(updateUserFormSchema),
    mode: 'onChange',
    defaultValues: {
      nickname: '',
      profileImageUrl: '',
    },
  });

  const watchedNickname = useWatch({ control, name: 'nickname' });

  useEffect(() => {
    const changed = !!profileImageFile || imageRemoved || (watchedNickname !== '' && watchedNickname !== currentNickname);
    setIsFormChanged(changed);
  }, [profileImageFile, imageRemoved, watchedNickname, currentNickname]);

  useEffect(() => {
    async function fetchUser() {
      try {
        const user = await getUser();
        setCurrentEmail(user.email);
        setCurrentNickname(user.nickname);
        const url = user.profileImageUrl || '';
        setProfileImageUrl(url);
        setInitialProfileImageUrl(url);
        setValue('profileImageUrl', url);
      } catch (error) {
        alert('유저 정보를 불러오는 중 오류가 발생하였습니다.');
        console.error(error);
      }
    }
    fetchUser();
  }, [setValue, alert]);

  const handleImageChange = (file: File | undefined) => {
    if (!file) {
      if (profileImageFile) {
        setProfileImageFile(null);
        setProfileImageUrl(initialProfileImageUrl);
        setValue('profileImageUrl', initialProfileImageUrl);
        setImageRemoved(false);
      } else {
        setProfileImageUrl('');
        setValue('profileImageUrl', '');
        setImageRemoved(true);
      }
    } else {
      setProfileImageFile(file);
      setImageRemoved(false);
    }
  };

  const handleSave = async (data: UpdateUserForm) => {
    let imageUrl = profileImageUrl;
    try {
      if (profileImageFile) {
        const uploadResponse = await createProfileImage({ image: profileImageFile });
        imageUrl = uploadResponse.profileImageUrl.toString();
      }
      const newNickname = data.nickname.trim() !== '' ? data.nickname : currentNickname;
      const updateData: UpdateUserForm = {
        nickname: newNickname,
        profileImageUrl: imageRemoved ? null : imageUrl === '' ? null : imageUrl,
      };
      await updateUser(updateData);
      alert('프로필이 성공적으로 업데이트되었습니다.');
      setCurrentNickname(newNickname);
      if (imageRemoved) {
        setProfileImageUrl('');
        setValue('profileImageUrl', '');
        setInitialProfileImageUrl('');
      }
      reset();
      setIsFormChanged(false);
      setImageRemoved(false);
    } catch (_error) {
      alert('프로필 업데이트 중 오류가 발생하였습니다.');
      console.error(_error);
    }
  };

  return (
    <div className='flex h-fit w-fit flex-col rounded-lg bg-white p-4 sm:p-6'>
      <span className='mb-4 text-2lg font-semibold sm:mb-6 sm:text-xl'>프로필</span>
      <div className='flex flex-col md:flex-row'>
        {/* 프로필 이미지 업로드 */}
        <div className='mb-4 w-[100px] md:mr-6 md:w-[182px]'>
          <ImageUpload value={imageRemoved ? undefined : profileImageFile || profileImageUrl} onChange={handleImageChange} onBlur={() => {}} className='w-full' />
        </div>
        {/* 프로필 수정 폼 */}
        <form onSubmit={handleSubmit(handleSave)} className='w-[252px] md:w-[276px] lg:w-[400px]'>
          <Input label='이메일' placeholder={currentEmail} readOnly className='mb-4 w-full' />
          <Input label='닉네임' placeholder={currentNickname} {...register('nickname')} error={errors.nickname?.message} className='mb-4 w-full' />
          <SubmitButton isValid={isValid && isFormChanged} isSubmitting={isSubmitting} text='저장' className='w-full' />
        </form>
      </div>
    </div>
  );
}
