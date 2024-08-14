// src/middleware/Admin/CategoryState.ts
import { create } from "zustand";

interface CategoryState {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  categories: Category[];
  addCategory: (category: Category) => void;
}

interface Category {
  slno: number;
  name: string;
  Desc: string;
  Date: string;
}

const useCategoryStore = create<CategoryState>((set) => {
  let nextSlNo = 1;

  return {
    searchQuery: "",
    setSearchQuery: (query) => set({ searchQuery: query }),
    categories: [],
    addCategory: (category) => {
      console.log("Category added to store:", category); // Log the category data
      set((state) => {
        const newCategory = { ...category, slno: nextSlNo++ };
        return { categories: [...state.categories, newCategory] };
      });
    },
  };
});

export default useCategoryStore;
