import { create } from "zustand";
import { devtools } from "zustand/middleware";
import * as Yup from "yup";

interface ContactFormState {
  email: string;
  name: string;
  subject: string;
  message: string;
  errors: Partial<Record<keyof ContactFormState, string>>;
  touched: Partial<Record<keyof ContactFormState, boolean>>;
  setFieldValue: (field: keyof ContactFormState, value: string) => void;
  setFieldTouched: (field: keyof ContactFormState, touched: boolean) => void;
  resetForm: () => void;
  validateForm: () => boolean;
}

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  name: Yup.string().required("Required"),
  subject: Yup.string().required("Required"),
  message: Yup.string().required("Required"),
});

export const useContactFormStore = create<ContactFormState>()(
  devtools((set, get) => ({
    email: "",
    name: "",
    subject: "",
    message: "",
    errors: {},
    touched: {},
    setFieldValue: (field, value) => set({ [field]: value }),
    setFieldTouched: (field, touched) =>
      set((state) => ({
        touched: { ...state.touched, [field]: touched },
      })),
    resetForm: () =>
      set({
        email: "",
        name: "",
        subject: "",
        message: "",
        errors: {},
        touched: {},
      }),
    validateForm: () => {
      const state = get();
      const errors: Partial<Record<keyof ContactFormState, string>> = {};

      try {
        validationSchema.validateSync(state, { abortEarly: false });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          err.inner.forEach((error) => {
            errors[error.path as keyof ContactFormState] = error.message;
          });
        }
      }

      set({ errors });
      return Object.keys(errors).length === 0;
    },
  }))
);
