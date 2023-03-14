import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface State {
  isToastVisible: boolean;
  toastMessage: string;
}

interface Actions {
  showToast: (message: string) => void;
  hideToast: () => void;
}

const initialState: State = {
  isToastVisible: false,
  toastMessage: "",
};

export const useStore = create<State & Actions>()(
  devtools((set) => ({
    ...initialState,

    showToast: (message) =>
      set((state) => {
        return {
          ...state,
          isToastVisible: true,
          toastMessage: message,
        };
      }),
    hideToast: () => {
      set((state) => {
        return {
          ...state,
          isToastVisible: false,
          toastMessage: state.toastMessage,
        };
      });
    },
  }))
);
