// src/store/useAuthStore.ts
import create from "zustand";

interface AuthState {
  isLoggedIn: boolean;
  userRole: string;
  setAuth: (isLoggedIn: boolean, userRole: string) => void;
  clearAuth: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  userRole: "",
  setAuth: (isLoggedIn: boolean, userRole: string) =>
    set({ isLoggedIn, userRole }),
  clearAuth: () => set({ isLoggedIn: false, userRole: "" }),
}));

export default useAuthStore;
