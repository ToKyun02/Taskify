import { DialogButtonsType, useDialogStore } from '@/stores/modalStore';

/**
 * useAlert 훅
 *
 * 간단한 알럿 다이얼로그를 띄워 메시지를 표시하고,
 * 콜백 실행이나 `await`로 다이얼로그 닫힘을 기다릴 수 있습니다.
 * 확인 버튼의 텍스트도 원하는 대로 커스터마이징 가능합니다.
 *
 * @example
 * import useAlert from '@/hooks/useAlert';
 *
 * function Component() {
 *   const alert = useAlert();
 *
 *   const handleClick = async () => {
 *     // 다이얼로그가 닫힐 때까지 기다림
 *     await alert('메시지 표시', {
 *       callback: () => {
 *         console.log('다이얼로그가 닫힌 후 실행되는 콜백입니다. 생략 가능합니다.');
 *       },
 *       buttons: { ok: '확인' }, // 확인 버튼 이름을 커스터마이징
 *     });
 *
 *     console.log('다이얼로그가 닫힌 후 추가 작업을 실행합니다.');
 *   };
 *
 *   return <button onClick={handleClick}>알림 표시</button>;
 * }
 */

type AlertOptionsType = {
  buttons: Partial<Pick<DialogButtonsType, 'ok'>>;
  callback: () => void;
};

export default function useAlert() {
  const { openDialog } = useDialogStore();

  const alert = async (message: string, options?: Partial<AlertOptionsType>) => {
    return openDialog({ message, type: 'alert', ...options });
  };

  return alert;
}
