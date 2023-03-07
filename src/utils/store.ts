import { create, StateCreator } from "zustand";
import { devtools } from "zustand/middleware";
import { Link } from "@prisma/client";

interface State {
  links: Link[];
}

interface Actions {
  setLinks(links: Link[]): void;
}

export const useStore = create<State & Actions>()(
  devtools((set) => ({
    links: [],
    setLinks: (links) => set((state) => ({ ...state, links: links })),
  }))
);
