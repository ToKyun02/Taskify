'use client';

import { useParams } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDashboardMutation, useDashboardQuery } from '@/apis/dashboards/queries';
import { Card, CardTitle } from '@/components/ui/Card/Card';
import { Input } from '@/components/ui/Field';
import ColorPicker from '@/components/ui/Chip/ColorPicker';
import { dashboardFormSchema, DashboardFormType } from '@/apis/dashboards/types';
import { getErrorMessage } from '@/utils/errorMessage';
import Button from '@/components/ui/Button/Button';
import { useEffect } from 'react';
import { DEFAULT_COLORS } from '@/constants/colors';
import useAlert from '@/hooks/useAlert';

export default function DetailModify() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useDashboardQuery(Number(id));
  const alert = useAlert();

  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors, isValid, isSubmitting, isDirty },
  } = useForm<DashboardFormType>({
    resolver: zodResolver(dashboardFormSchema),
    mode: 'onBlur',
    defaultValues: {
      title: '',
      color: DEFAULT_COLORS[0],
    },
  });
  const { update } = useDashboardMutation();

  useEffect(() => {
    //react query의 데이터가 오기전에 rhf의 기본값이 셋팅되어서 effect를 통해 재설정
    if (data) {
      reset({
        title: data.title,
        color: data.color,
      });
    }
  }, [data, reset]);

  const onSubmit = async (formData: DashboardFormType) => {
    try {
      await update({ id: Number(id), ...formData });
      reset();
      alert('수정했습니다.');
    } catch (error) {
      const message = getErrorMessage(error);
      alert(message);
    }
  };

  const isDisabled = !isDirty || !isValid || isSubmitting;

  return (
    <Card>
      {isLoading ? (
        <div>대시보드 정보를 가져오는 중입니다.</div>
      ) : (
        <>
          <CardTitle>{data?.title}</CardTitle>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='grid gap-6 py-2'>
              <Input //
                label='대시보드 이름'
                error={errors.title?.message}
                placeholder='대시보드 이름을 입력해주세요'
                {...register('title')}
              />
              <Controller //
                control={control}
                name='color'
                render={({ field }) => {
                  return <ColorPicker name='color' selected={field.value} onChange={(value) => field.onChange(value)} />;
                }}
              />
              <Button type='submit' disabled={isDisabled}>
                변경
              </Button>
            </div>
          </form>
        </>
      )}
    </Card>
  );
}
