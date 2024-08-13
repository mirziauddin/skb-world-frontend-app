import { create } from "zustand";

interface FooterState {
  sections: {
    title: string;
    links: { name: string; url: string }[];
  }[];
  setSections: (sections: FooterState["sections"]) => void;
}

export const useFooterStore = create<FooterState>((set) => ({
  sections: [], // Default empty sections
  setSections: (sections) => set({ sections }),
}));
