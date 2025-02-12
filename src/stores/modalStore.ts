import { create } from 'zustand';

type DialogState = {
  isOpen: boolean;
  message: string;
  callback?: () => void;
  resolvePromise?: () => void;

  openDialog: ({ message, callback }: { message: string; callback?: () => void }) => Promise<void> | void;
  closeDialog: () => void;
};

export const useDialogStore = create<DialogState>()((set) => ({
  isOpen: false,
  message: '',
  callback: undefined,
  resolvePromise: undefined,

  openDialog: ({ message, callback }) => new Promise<void>((resolve) => set({ isOpen: true, message, callback, resolvePromise: resolve })),
  closeDialog: () =>
    set((state) => {
      state.resolvePromise?.();
      return { isOpen: false, message: '', callback: undefined, resolvePromise: undefined };
    }),
}));
