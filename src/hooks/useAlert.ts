import { useDialogStore } from '@/stores/modalStore';

/**
 * useAlert 훅
 *
 * 간단한 메시지 노출과 선택적 콜백을 실행해주는 알럿 다이얼로그
 *
 * @example
 * import useAlert from '@/hooks/useAlert';
 *
 * function Component() {
 *   const alert = useAlert();
 *
 *   const handleClick = () => {
 *     alert('메시지 표시', () => {
 *       console.log('다이얼로그가 닫힌후 콜백입니다. 생략 가능합니다.');
 *     });
 *   };
 *
 *   return <button onClick={handleClick}>알림 표시</button>;
 * }
 */

export default function useAlert() {
  const { openDialog } = useDialogStore();

  const alert = async (message: string, callback?: () => void) => {
    await openDialog({ message, callback });
  };

  return alert;
}
