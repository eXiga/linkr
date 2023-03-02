import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface State {}

const initialState: State = {};

export const useStore = create<State>()(
  devtools((set) => ({
    ...initialState,
  }))
);
