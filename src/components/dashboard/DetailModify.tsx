'use client';

import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useAlert from '@/hooks/useAlert';
import { useUpdateDashboard } from '@/apis/dashboards/queries';
import { Dashboard, dashboardFormSchema, DashboardFormType } from '@/apis/dashboards/types';
import { getErrorMessage } from '@/utils/network/errorMessage';
import { Card, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Field';
import ColorPicker from '@/components/ui/Chip/ColorPicker';
import Button from '@/components/ui/Button';

export default function DetailModify({ data }: { data: Dashboard }) {
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
      title: data.title,
      color: data.color,
    },
  });
  const { mutateAsync: update } = useUpdateDashboard();
  const alert = useAlert();
  const router = useRouter();

  const onSubmit = async (formData: DashboardFormType) => {
    try {
      await update({ id: Number(data.id), ...formData });
      reset({
        title: formData.title,
        color: formData.color,
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
      <CardTitle>{data.title}</CardTitle>
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
    </Card>
  );
}
