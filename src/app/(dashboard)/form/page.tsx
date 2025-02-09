'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import Button from '@/components/ui/Button/Button';
import { Input, Textarea, TagInput, DateInput, ImageUpload, SearchInput } from '@/components/ui/Field';

/**
 * Input, Textarea, SearchInput 컴포넌트는 controlled, uncontrolled 둘다 사용하실 수 있습니다.
 * TagInput, DateInput, ImageUpload는 controlled로만 작동합니다.
 *
 * controlled 컴포넌트를 RHF(React Hook Form)에 연결하는 샘플은
 * 아래 코드에서 확인하시면 됩니다.
 * (RHF의 Controller의 render함수에서 제공하는 field(value, onChange, onBlur)를
 * 내부 컴포넌트에게 전달해서 작동을 하는 원리입니다.)
 *
 *
 * 커스텀 컴포넌트를 제외한 대부분의 컴포넌트는 기본적으로 input attributes를 확장하여 제공하도록 작성하여
 * 기본 input의 속성들을 전달하실 수 있습니다. (placeholder, required, disabled, readonly....)
 */

const sampleSchema = z.object({
  title: z.string().min(2, { message: '최소 두글자 이상 작성해주세요' }),
  content: z.string().min(2, { message: '최소 두글자 이상 작성해주세요' }),
  date: z.date({ message: '날짜를 입력해주세요' }),
  tags: z.array(z.string()).min(1, { message: '태그를 한개 이상 입력해주세요.' }),
  keyword: z.string(),
  image: z
    .union([
      z
        .instanceof(File)
        .refine((file) => file.type.startsWith('image/'), { message: '이미지 파일만 업로드 가능합니다.' })
        .refine((file) => file.size < 2 * 1024 * 1024, { message: '2MB이하로 올려주세요' }),
      z.string(),
    ])
    .optional(),
  // 파일업로드를 필수로 하려면 optional을 지우고 아래 refine을 붙여주시면됩니다.
  // .refine((value) => value instanceof File || (typeof value === 'string' && value.length > 0), { message: '파일을 업로드해주세요' }),
});

type SampleFormType = z.infer<typeof sampleSchema>;

export default function FormPage() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SampleFormType>({
    resolver: zodResolver(sampleSchema),
    mode: 'onBlur',
    defaultValues: {
      title: '제목',
      content: '내용내용 테스트세트슽',
      date: undefined,
      tags: [],
      keyword: '',
      image: undefined,
    },
  });

  const onSubmit = (formData: SampleFormType) => {
    console.log(formData);
  };

  return (
    <div className='p-10'>
      <div className='rounded-md bg-white p-10'>
        <div className='mb-10 grid gap-3'>
          {/* input sample : controlled */}
          <Input
            value='readonly 설정을 하면 글자만 조금 투명해집니다.'
            onChange={(e) => {
              console.log(e.target.value);
            }}
            readOnly
          />
          <Textarea
            value='disabled 설정하면 배경도 어두워집니다.'
            onChange={(e) => {
              console.log(e.target.value);
            }}
            disabled
          />
          <SearchInput placeholder='검색어를 입력해주세요' />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className='grid gap-4'>
          {/* input sample : uncontrolled  */}
          <Input //
            label='제목'
            error={errors.title?.message}
            placeholder='제목을 입력해주세요'
            required
            {...register('title')}
          />

          {/* textarea sample : uncontrolled */}
          <Textarea //
            label='내용'
            error={errors.content?.message}
            placeholder='내용을 입력해주세요'
            required
            {...register('content')}
          />

          {/* datepicker sample : controlled */}
          <Controller //
            name='date'
            control={control}
            render={({ field }) => {
              return (
                <DateInput //
                  label='마감일'
                  error={errors.date?.message}
                  placeholder='날짜를 입력해주세요'
                  required
                  {...field}
                />
              );
            }}
          />

          {/* tags input sample : controlled */}
          <Controller //
            name='tags'
            control={control}
            render={({ field }) => {
              return (
                <TagInput //
                  label='태그'
                  error={errors.tags?.message}
                  placeholder='입력후 Enter'
                  required
                  {...field}
                />
              );
            }}
          />

          {/* image upload sample : controlled */}
          <Controller
            name='image'
            control={control}
            render={({ field }) => {
              return (
                <ImageUpload //
                  label='이미지'
                  error={errors.image?.message}
                  {...field}
                />
              );
            }}
          />

          <Button type='submit'>제출</Button>
        </form>
      </div>
    </div>
  );
}
