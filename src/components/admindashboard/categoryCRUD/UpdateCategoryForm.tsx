import { useState } from "react";
import axios from "axios";
import { BASE_URL, getFromLocalStorage } from "../../../utils";

interface UpdateCategoryFormProps {
  categoryId: string;
  initialName: string;
  initialDescription: string;
  initialImageUpload: string;
  onUpdateCategory: () => void;
  onClose: () => void;
}

export default function UpdateCategoryForm({
  categoryId,
  initialName,
  initialDescription,
  initialImageUpload,
  onUpdateCategory,
  onClose,
}: UpdateCategoryFormProps) {
  const [name, setName] = useState(initialName);
  const [description, setDescription] = useState(initialDescription);
  const [imageUpload, setImageUpload] = useState(initialImageUpload);

  const handleUpdate = async () => {
    const accessToken = getFromLocalStorage("ACCESS_TOKEN");

    if (!accessToken) {
      console.error("No access token found");
      return;
    }

    try {
      await axios.put(
        `${BASE_URL}/catagory/${categoryId}`, // Ensure this URL is correct
        {
          name,
          description,
          imageUpload,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      onUpdateCategory();
    } catch (error) {
      console.error("Failed to update category:", error);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageUpload(e.target?.result as string);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-md shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Update Category</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Image Upload</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {imageUpload && (
            <img
              src={imageUpload}
              alt="Category"
              className="mt-2 w-32 h-32 object-cover"
            />
          )}
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleUpdate}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mr-2"
          >
            Update
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-black py-2 px-4 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
