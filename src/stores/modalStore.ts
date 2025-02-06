import { create } from 'zustand';

type DialogState = {
  isOpen: boolean;
  message: string;
  callback?: () => void;

  openDialog: ({ message, callback }: { message: string; callback?: () => void }) => void;
  closeDialog: () => void;
};

export const useDialogStore = create<DialogState>()((set) => ({
  isOpen: false,
  message: '',
  callback: undefined,

  openDialog: ({ message, callback }) => set({ isOpen: true, message, callback }),
  closeDialog: () => set({ isOpen: false, message: '', callback: undefined }),
}));
