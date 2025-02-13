import { create } from 'zustand';

export type DialogButtonsType = {
  ok: string;
  cancel: string;
};
export type DialogType = 'alert' | 'confirm';
export type DialogState = {
  isOpen: boolean;
  message: string;
  type?: DialogType;
  buttons: DialogButtonsType;
  callback?: () => void;
  resolvePromise?: () => void;
  rejectPromise?: () => void;
  openDialog: ({ message, type, buttons, callback }: { message: string; type: DialogType; buttons?: Partial<DialogButtonsType>; callback?: () => void }) => Promise<boolean>;
};

export const useDialogStore = create<DialogState>()((set) => {
  const defaultButtons: DialogButtonsType = {
    ok: '확인',
    cancel: '취소',
  };

  return {
    isOpen: false,
    message: '',
    type: undefined,
    buttons: defaultButtons,
    callback: undefined,
    resolvePromise: undefined,
    rejectPromise: undefined,
    openDialog: ({ message, callback, type, buttons }) => {
      const promise = new Promise<void>((resolve, reject) => {
        return set({
          isOpen: true,
          message,
          type,
          buttons: { ...defaultButtons, ...buttons },
          callback,
          resolvePromise: resolve,
          rejectPromise: reject,
        });
      });

      return promise.then(
        () => {
          set({ isOpen: false, message: '', callback: undefined, resolvePromise: undefined, type: undefined });
          return true;
        },
        () => {
          set({ isOpen: false, message: '', callback: undefined, resolvePromise: undefined, type: undefined });
          return false;
        },
      );
    },
  };
});
