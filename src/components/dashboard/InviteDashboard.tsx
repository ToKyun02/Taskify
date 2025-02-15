import { forwardRef } from 'react';
import { useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useAlert from '@/hooks/useAlert';
import { Modal, ModalContent, ModalFooter, ModalHandle, ModalHeader } from '@/components/ui/Modal/Modal';
import { Input } from '@/components/ui/Field';
import Button from '@/components/ui/Button/Button';
import { inviteDashboardFormSchema, InviteDashboardFormType } from '@/apis/dashboards/types';
import { useInviteDashboard } from '@/apis/dashboards/queries';
import { getErrorMessage } from '@/utils/errorMessage';

const InviteDashboard = forwardRef<ModalHandle>((props, ref) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm<InviteDashboardFormType>({
    resolver: zodResolver(inviteDashboardFormSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
    },
  });
  const { id } = useParams<{ id: string }>();
  const { mutateAsync: invite } = useInviteDashboard();
  const alert = useAlert();

  const handleReset = () => {
    reset();
    if (ref && 'current' in ref) {
      ref.current?.close();
    }
  };

  const onSubmit = async (formData: InviteDashboardFormType) => {
    try {
      await invite({ id: Number(id), email: formData.email });
      alert('초대했습니다.');
      reset();
      if (ref && 'current' in ref) {
        ref.current?.close();
      }
    } catch (error) {
      const message = getErrorMessage(error);
      alert(message);
    }
  };

  return (
    <Modal ref={ref}>
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>초대하기</ModalHeader>
          <div className='grid gap-6 py-2'>
            <Input //
              label='이메일'
              error={errors.email?.message}
              placeholder='이메일을 입력해주세요'
              {...register('email')}
            />
          </div>
          <ModalFooter>
            <Button type='button' variant='outline' size='lg' onClick={handleReset}>
              취소
            </Button>
            <Button type='submit' size='lg' disabled={!isValid || isSubmitting}>
              {isSubmitting ? '전송중' : '초대'}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
});

InviteDashboard.displayName = 'InviteDashboard';

export default InviteDashboard;
