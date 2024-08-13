// src/store/useContactStore.ts
import { create } from "zustand";

interface ContactState {
  formValues: {
    email: string;
    name: string;
    subject: string;
    message: string;
  };
  setFormValues: (values: Partial<ContactState["formValues"]>) => void;
  clearForm: () => void;
}

const useContactStore = create<ContactState>((set) => ({
  formValues: {
    email: "",
    name: "",
    subject: "",
    message: "",
  },
  setFormValues: (values) =>
    set((state) => ({
      formValues: { ...state.formValues, ...values },
    })),
  clearForm: () =>
    set({ formValues: { email: "", name: "", subject: "", message: "" } }),
}));

export default useContactStore;
