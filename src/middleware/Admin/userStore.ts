import { create } from "zustand";

interface UserFormState {
  isOpen: boolean;
  formData: {
    email: string;
    name: string;
    password: string;
  };
  openForm: () => void;
  closeForm: () => void;
  updateFormData: (field: string, value: string) => void;
}

export const useUserStore = create<UserFormState>((set) => ({
  isOpen: false,
  formData: {
    email: "",
    name: "",
    password: "",
  },
  openForm: () => set({ isOpen: true }),
  closeForm: () => set({ isOpen: false }),
  updateFormData: (field, value) =>
    set((state) => ({
      formData: {
        ...state.formData,
        [field]: value,
      },
    })),
}));
