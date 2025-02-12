import { DialogButtonsType, useDialogStore } from '@/stores/modalStore';

/**
 * useConfirm 훅
 *
 * 확인과 취소 버튼이 있는 다이얼로그를 띄워 사용자에게 동작 여부를 묻습니다.
 * 버튼 텍스트를 커스터마이징할 수 있으며, `await`로 사용자 응답을 기다릴 수 있습니다.
 *
 * @example
 * import useConfirm from '@/hooks/useConfirm';
 *
 * function Component() {
 *   const confirm = useConfirm();
 *
 *   const handleClick = async () => {
 *     // 다이얼로그가 닫힐 때까지 기다림
 *     const userConfirmed = await confirm('정말로 삭제하시겠습니까?', {
 *       buttons: {
 *         ok: '삭제',
 *         cancel: '취소',
 *       },
 *       callback: () => {
 *         console.log('다이얼로그가 닫힌 후 실행되는 콜백입니다. 생략 가능합니다.');
 *       },
 *     });
 *
 *     if (userConfirmed) {
 *       console.log('사용자가 확인 버튼을 눌렀습니다.');
 *     } else {
 *       console.log('사용자가 취소 버튼을 눌렀습니다.');
 *     }
 *   };
 *
 *   return <button onClick={handleClick}>삭제하기</button>;
 * }

 */

type ConfirmOptionsType = {
  buttons: Partial<DialogButtonsType>;
  callback: () => void;
};

export default function useConfirm() {
  const { openDialog } = useDialogStore();

  const confirm = async (message: string, options?: Partial<ConfirmOptionsType>) => {
    return openDialog({ message, type: 'confirm', ...options });
  };

  return confirm;
}
