import { forwardRef } from 'react';
import { useRouter } from 'next/navigation';
import { isAxiosError } from 'axios';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useAlert from '@/hooks/useAlert';
import { Modal, ModalContent, ModalFooter, ModalHandle, ModalHeader } from '@/components/ui/Modal/Modal';
import Button from '@/components/ui/Button/Button';
import ColorPicker from '@/components/ui/Chip/ColorPicker';
import { useDashboardMutation } from '@/apis/dashboards/queries';
import { dashboardFormSchema, DashboardFormType } from '@/apis/dashboards/types';
import { DEFAULT_COLORS } from '@/constants/colors';

const CreateDashboard = forwardRef<ModalHandle>((props, ref) => {
  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm<DashboardFormType>({
    resolver: zodResolver(dashboardFormSchema),
    mode: 'onBlur',
    defaultValues: {
      title: '',
      color: DEFAULT_COLORS[0],
    },
  });
  const { create } = useDashboardMutation();
  const alert = useAlert();
  const router = useRouter();

  const handleReset = () => {
    reset();
    if (ref && 'current' in ref) {
      ref.current?.close();
    }
  };

  const onSubmit = async (formData: DashboardFormType) => {
    try {
      const { id } = await create(formData);
      handleReset();
      router.push(`/dashboard/${id}`);
    } catch (error) {
      alert(isAxiosError(error) ? error.message : '문제가 발생했습니다.');
    }
  };

  return (
    <Modal ref={ref}>
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>새로운 대시보드</ModalHeader>
          <div className='grid gap-4'>
            {/* TODO : 공용 Field 컴포넌트 개발후 교체 필요 */}
            <label className='grid gap-3'>
              <span>대시보드 이름</span>
              <input type='text' {...register('title')} className='h-10 rounded-md border px-2' />
            </label>
            <div>{errors.title?.message}</div>

            <Controller //
              control={control}
              name='color'
              render={({ field }) => {
                return <ColorPicker name='color' selected={field.value} onChange={(value) => field.onChange(value)} />;
              }}
            />
          </div>
          <ModalFooter>
            <Button type='button' variant='outline' size='lg' onClick={handleReset}>
              취소
            </Button>
            <Button type='submit' size='lg' disabled={!isValid || isSubmitting}>
              {isSubmitting ? '생성중' : '생성'}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
});

CreateDashboard.displayName = 'CreateDashboard';

export default CreateDashboard;
