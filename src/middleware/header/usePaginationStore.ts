// src/store/usePaginationStore.ts
import { create } from "zustand";

type PaginationState = {
  currentPage: number;
  setCurrentPage: (page: number) => void;
};

export const usePaginationStore = create<PaginationState>((set) => ({
  currentPage: 1,
  setCurrentPage: (page) => set({ currentPage: page }),
}));
