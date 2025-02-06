import { useDialogStore } from '@/stores/modalStore';

export default function useAlert() {
  const { openDialog } = useDialogStore();

  const alert = (message: string, callback?: () => void) => {
    openDialog({ message, callback });
  };

  return alert;
}
