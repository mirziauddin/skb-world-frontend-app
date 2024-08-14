// usePasswordStore.ts
import { create } from "zustand";

interface PasswordState {
  previousPassword: string;
  newPassword: string;
  reenterNewPassword: string;
  setPreviousPassword: (password: string) => void;
  setNewPassword: (password: string) => void;
  setReenterNewPassword: (password: string) => void;
  resetForm: () => void;
}

export const usePasswordStore = create<PasswordState>((set) => ({
  previousPassword: "",
  newPassword: "",
  reenterNewPassword: "",
  setPreviousPassword: (password) => set({ previousPassword: password }),
  setNewPassword: (password) => set({ newPassword: password }),
  setReenterNewPassword: (password) => set({ reenterNewPassword: password }),
  resetForm: () =>
    set({
      previousPassword: "",
      newPassword: "",
      reenterNewPassword: "",
    }),
}));
