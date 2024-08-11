import create from "zustand";

interface SignupState {
  name: string;
  email: string;
  password: string;
  repassword: string;
  acceptConditions: boolean;
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setRepassword: (repassword: string) => void;
  setAcceptConditions: (acceptConditions: boolean) => void;
  resetForm: () => void;
}

export const useSignupStore = create<SignupState>((set) => ({
  name: "",
  email: "",
  password: "",
  repassword: "",
  acceptConditions: false,
  setName: (name) => set({ name }),
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setRepassword: (repassword) => set({ repassword }),
  setAcceptConditions: (acceptConditions) => set({ acceptConditions }),
  resetForm: () =>
    set({
      name: "",
      email: "",
      password: "",
      repassword: "",
      acceptConditions: false,
    }),
}));
