import { create } from "zustand";
import axios from "axios";
import { BASE_URL, getFromLocalStorage } from "../../utils";

// Define the SubCategory type
interface SubCategory {
  id: string;
  name: string;
  description?: string;
  imageUpload?: string;
  pdfUpload?: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
}

// Define the state and actions
interface SubCategoryState {
  subCategories: SubCategory[];
  searchQuery: string;
  fetchSubCategories: (categoryId: string) => void;
  addSubCategory: (
    categoryId: string,
    subCategoryData: Omit<
      SubCategory,
      "id" | "createdAt" | "updatedAt" | "categoryId"
    >
  ) => void;
  editSubCategory: (
    subCategoryId: string,
    subCategoryData: Partial<Omit<SubCategory, "id" | "categoryId">>
  ) => void;
  deleteSubCategory: (subCategoryId: string) => void;
}

// Create the Zustand store
const useSubCategoryStore = create<SubCategoryState>((set) => ({
  subCategories: [],
  searchQuery: "",

  fetchSubCategories: async (categoryId: string) => {
    const accessToken = getFromLocalStorage("ACCESS_TOKEN");
    if (!accessToken) {
      console.error("No access token found");
      set({ subCategories: [] });
      return;
    }

    try {
      const response = await axios.get(
        `${BASE_URL}/subCatagory?categoryId=${categoryId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      set({ subCategories: response.data });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Failed to fetch subcategories",
          error.response?.data || error.message
        );
        if (error.response?.status === 401) {
          console.error(
            "Unauthorized access - Token might be invalid or expired."
          );
        }
      } else {
        console.error("Unexpected error", error);
      }
      set({ subCategories: [] });
    }
  },

  addSubCategory: async () => {
    const accessToken = getFromLocalStorage("ACCESS_TOKEN");
    if (!accessToken) {
      console.error("No access token found");
      return;
    }

    try {
      // Uncomment and adjust the endpoint if necessary
      // const response = await axios.post(
      //   `${BASE_URL}/subCategory/`,
      //   { ...subCategoryData, categoryId },
      //   {
      //     headers: {
      //       Authorization: `Bearer ${accessToken}`,
      //     },
      //   }
      // );
      // set((state) => ({
      // subCategories: [...state.subCategories, response.data],
      // }));
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data || error.message);
      } else {
        console.error("Unexpected error", error);
      }
    }
  },

  editSubCategory: async (
    subCategoryId: string,
    subCategoryData: Partial<Omit<SubCategory, "id" | "categoryId">>
  ) => {
    const accessToken = getFromLocalStorage("ACCESS_TOKEN");
    if (!accessToken) {
      console.error("No access token found");
      return;
    }

    try {
      const response = await axios.put(
        `${BASE_URL}/subCatagory/${subCategoryId}`,
        subCategoryData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      set((state) => ({
        subCategories: state.subCategories.map((subCat) =>
          subCat.id === subCategoryId ? response.data : subCat
        ),
      }));
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Failed to update subcategory",
          error.response?.data || error.message
        );
      } else {
        console.error("Unexpected error", error);
      }
    }
  },

  deleteSubCategory: async (subCategoryId: string) => {
    const accessToken = getFromLocalStorage("ACCESS_TOKEN");

    if (!accessToken) {
      console.error("No access token found");
      return;
    }

    try {
      // Perform the DELETE request with the authorization header
      await axios.delete(`${BASE_URL}/subCatagory/${subCategoryId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Update the Zustand store by removing the deleted subcategory
      set((state) => ({
        subCategories: state.subCategories.filter(
          (subCategory) => subCategory.id !== subCategoryId
        ),
      }));

      console.log("Subcategory deleted successfully");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Failed to delete subcategory",
          error.response?.data || error.message
        );
      } else {
        console.error("Unexpected error", error);
      }
    }
  },
}));

export default useSubCategoryStore;
