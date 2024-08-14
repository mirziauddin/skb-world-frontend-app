import { create } from "zustand";

type AuthStore = {
  isLoggedIn: boolean;
  userRole: string;
  setAuth: (isLoggedIn: boolean, role: string) => void;
  clearAuth: () => void;
  setRole: (role: string) => void;
};

const useAuthStore = create<AuthStore>((set) => ({
  isLoggedIn: false,
  userRole: "",
  // Update both isLoggedIn and userRole
  setAuth: (isLoggedIn, role) => set({ isLoggedIn, userRole: role }),
  // Clear authentication data
  clearAuth: () => set({ isLoggedIn: false, userRole: "" }),
  // Update only userRole
  setRole: (role) => set({ userRole: role }),
}));

export default useAuthStore;
