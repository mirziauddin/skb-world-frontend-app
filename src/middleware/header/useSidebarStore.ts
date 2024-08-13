import { create } from "zustand";

interface SidebarState {
  isOpen: boolean;
  activeContent: string;
  toggleSidebar: () => void;
  setActiveContent: (content: string) => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
  isOpen: true,
  activeContent: "home", // Default active content
  toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen })),
  setActiveContent: (content) => set({ activeContent: content }),
}));
