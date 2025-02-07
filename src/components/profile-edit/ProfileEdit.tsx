'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import PlusIC from '@/assets/icons/plus.svg';
import CloseIC from '@/assets/icons/x.svg';

interface ProfileEditProps {
  currentEmail: string;
  currentNickname: string;
}

export default function ProfileEdit({ currentEmail, currentNickname }: ProfileEditProps) {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [emailValid, setEmailValid] = useState(true);
  const [nicknameValid, setNicknameValid] = useState(true);
  const [isChanged, setIsChanged] = useState(false);

  // 이메일 유효성 검사 (영문만 허용)
  const validateEmail = (value: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    setEmailValid(emailRegex.test(value));
  };

  // 닉네임 유효성 검사 (최소 2자)
  const validateNickname = (value: string) => {
    setNicknameValid(value.length >= 2);
  };

  // 프로필 이미지 변경
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
    }
  };

  // 프로필 이미지 삭제
  const handleImageReset = () => {
    setPreviewImage(null);
  };

  useEffect(() => {
    const hasChanged = email.trim() !== '' || nickname.trim() !== '' || previewImage !== null;

    setIsChanged(hasChanged);
  }, [email, nickname, previewImage]);

  const handleSave = () => {
    if (!isChanged || !emailValid || !nicknameValid) return;

    const updatedData: { email?: string; nickname?: string; profileImage?: string } = {};

    if (email.trim() !== '') updatedData.email = email;
    if (nickname.trim() !== '') updatedData.nickname = nickname;
    if (previewImage !== null) updatedData.profileImage = previewImage;

    //ToDo : API 연동 시 여기에 axios.post 요청 추가
    alert(`저장된 데이터: \n${JSON.stringify(updatedData, null, 2)}`);
  };

  return (
    <div className='flex h-fit w-fit flex-col rounded-lg bg-white p-[16px] sm:p-[24px]'>
      <span className='mb-[40px] text-2lg font-semibold sm:mb-[24px] sm:text-[24px]'>프로필</span>
      <div className='sm:flex'>
        {/* 프로필 이미지 업로드 */}
        <div className='relative mb-[40px] sm:mr-[42px]'>
          <label htmlFor='image-upload' className='relative flex h-[100px] w-[100px] cursor-pointer items-center justify-center rounded-md bg-gray-10 sm:h-[182px] sm:w-[182px]'>
            {previewImage ? (
              <Image src={previewImage} alt='Profile Preview' width={100} height={100} className='h-full w-full rounded-lg object-cover' />
            ) : (
              <Image src={PlusIC} alt='프로필 이미지 추가' width={12} height={12} />
            )}
          </label>
          <input type='file' id='image-upload' className='hidden' accept='image/*' onChange={handleImageChange} />
          {previewImage && (
            <button onClick={handleImageReset} className='absolute left-[5px] top-[5px] flex h-[22px] w-[22px] items-center justify-center rounded-full bg-white hover:bg-gray-20'>
              <Image src={CloseIC} alt='이미지 제거' width={12} height={12} />
            </button>
          )}
        </div>
        {/* 입력 필드 */}
        <div>
          {/* 이메일 입력 */}
          <div className='mb-[16px] flex flex-col gap-[8px]'>
            <label className='text-[14px] text-gray-70 sm:text-[16px]'>이메일</label>
            <input
              type='email'
              value={email}
              placeholder={currentEmail}
              className={`h-[50px] w-[252px] rounded-lg border pl-[16px] text-[16px] text-gray-60 placeholder:text-gray-40 sm:w-[276px] lg:w-[400px] ${
                emailValid
                  ? 'border-gray-30 focus:border-violet-20 focus:outline focus:outline-1 focus:outline-violet-20'
                  : 'border-red focus:border-red focus:outline focus:outline-1 focus:outline-red'
              }`}
              onChange={(e) => {
                setEmail(e.target.value);
                validateEmail(e.target.value);
              }}
            />
            {!emailValid && <span className='text-sm text-red'>올바른 이메일 형식을 입력하세요.</span>}
          </div>
          {/* 닉네임 입력 */}
          <div className='mb-[24px] flex flex-col gap-[8px]'>
            <label className='text-[14px] text-gray-70 sm:text-[16px]'>닉네임</label>
            <input
              type='text'
              value={nickname}
              placeholder={currentNickname}
              className={`h-[50px] w-[252px] rounded-lg border pl-[16px] text-[16px] text-gray-60 placeholder:text-gray-40 sm:w-[276px] lg:w-[400px] ${
                nicknameValid
                  ? 'border-gray-30 focus:border-violet-20 focus:outline focus:outline-1 focus:outline-violet-20'
                  : 'border-red focus:border-red focus:outline focus:outline-1 focus:outline-red'
              }`}
              onChange={(e) => {
                setNickname(e.target.value);
                validateNickname(e.target.value);
              }}
            />
            {!nicknameValid && <span className='text-sm text-red'>닉네임은 최소 2자 이상이어야 합니다.</span>}
          </div>
          {/* 저장 버튼 */}
          <button
            className={`h-[54px] w-[252px] rounded-lg text-white sm:w-[276px] lg:w-[400px] ${
              isChanged && emailValid && nicknameValid ? 'cursor-pointer bg-violet-20' : 'cursor-not-allowed bg-gray-30'
            }`}
            disabled={!isChanged || !emailValid || !nicknameValid}
            onClick={handleSave}
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
}
