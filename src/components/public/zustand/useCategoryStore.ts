import { create } from "zustand";
import axios from "axios";
import { BASE_URL } from "../../../utils";

type Category = {
  id: string;
  name: string;
  description?: string;
  imageUpload?: string;
  createdAt?: string;
};

type CategoryStore = {
  categories: Category[];
  loading: boolean;
  error: string | null;
  fetchCategories: () => Promise<void>;
};

const useCategoryStore = create<CategoryStore>((set) => ({
  categories: [],
  loading: true,
  error: null,
  fetchCategories: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/catagory`);
      set({ categories: response.data, loading: false, error: null });
    } catch (err) {
      set({ error: "Failed to fetch categories", loading: false });
    }
  },
}));

export default useCategoryStore;
