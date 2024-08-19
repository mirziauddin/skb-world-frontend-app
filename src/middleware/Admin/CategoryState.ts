import { create } from "zustand";
import { BASE_URL, getFromLocalStorage } from "../../utils";

interface Category {
  id: string;
  name: string;
  description?: string;
  imageUpload?: string;
  createdAt: string;
  updatedAt: string;
}

interface CategoryState {
  categories: Category[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  fetchCategories: () => void;
  addCategory: (
    category: Omit<Category, "id" | "createdAt" | "updatedAt">
  ) => void;
  editCategory: (id: string, category: Partial<Omit<Category, "id">>) => void;
  deleteCategory: (id: string) => void;
}

const useCategoryStore = create<CategoryState>((set) => ({
  categories: [],
  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query }),

  fetchCategories: async () => {
    const accessToken = getFromLocalStorage("ACCESS_TOKEN");
    if (!accessToken) {
      console.error("No access token found");
      set({ categories: [], searchQuery: "" });
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/catagory`, {
        // Fixed endpoint
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }

      const data = await response.json();
      set({ categories: Array.isArray(data) ? data : [] });
    } catch (error) {
      console.error("Failed to fetch categories", error);
      set({ categories: [] });
    }
  },

  addCategory: async (category) => {
    const accessToken = getFromLocalStorage("ACCESS_TOKEN");
    if (!accessToken) {
      console.error("No access token found");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/catagory`, {
        // Fixed endpoint
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(category),
      });

      if (!response.ok) {
        throw new Error("Failed to add category");
      }

      const newCategory = await response.json();
      set((state) => ({ categories: [...state.categories, newCategory] }));
    } catch (error) {
      console.error("Failed to add category", error);
    }
  },

  editCategory: async (id, category) => {
    const accessToken = getFromLocalStorage("ACCESS_TOKEN");
    if (!accessToken) {
      console.error("No access token found");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/catagory/${id}`, {
        // Fixed endpoint
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(category),
      });

      if (!response.ok) {
        throw new Error("Failed to edit category");
      }

      set((state) => ({
        categories: state.categories.map((cat) =>
          cat.id === id ? { ...cat, ...category } : cat
        ),
      }));
    } catch (error) {
      console.error("Failed to edit category", error);
    }
  },

  deleteCategory: async (id) => {
    const accessToken = getFromLocalStorage("ACCESS_TOKEN");
    if (!accessToken) {
      console.error("No access token found");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/catagory/${id}`, {
        // Fixed endpoint
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete category");
      }

      set((state) => ({
        categories: state.categories.filter((cat) => cat.id !== id),
      }));
    } catch (error) {
      console.error("Failed to delete category", error);
    }
  },
}));

export default useCategoryStore;
