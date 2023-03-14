import { create } from "zustand";
import { devtools } from "zustand/middleware";

const SelectedModes = ["All", "Must", "Consider", "Later"] as const;
type SelectedMode = typeof SelectedModes[number];

interface State {
  isToastVisible: boolean;
  toastMessage: string;
  selectedMode: SelectedMode;
}

interface Actions {
  showToast: (message: string) => void;
  hideToast: () => void;
  setSelectedMode: (mode: SelectedMode) => void;
}

const initialState: State = {
  isToastVisible: false,
  toastMessage: "",
  selectedMode: "All",
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
    setSelectedMode: (mode) => {
      set((state) => {
        return {
          ...state,
          selectedMode: mode,
        };
      });
    },
  }))
);
