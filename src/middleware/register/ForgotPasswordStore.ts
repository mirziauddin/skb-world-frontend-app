import create from "zustand";

interface ForgotPasswordStore {
  email: string;
  setEmail: (email: string) => void;
  resetForm: () => void;
}

export const useForgotPasswordStore = create<ForgotPasswordStore>((set) => ({
  email: "",
  setEmail: (email: string) => set({ email }),
  resetForm: () => set({ email: "" }),
}));
