import { useEffect, useState } from "react";
import axios from "axios";

type Category = {
  id: string;
  name: string;
  description?: string;
  imageUpload?: string;
};

export default function MediaCard() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/catagory/"
        );
        setCategories(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch categories");
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4">
      {categories.map((category) => (
        <div
          key={category.id}
          className="bg-white shadow-md rounded-lg overflow-hidden"
        >
          {category.imageUpload && (
            <img
              src={category.imageUpload}
              alt={category.name}
              className="w-full h-32 object-cover"
            />
          )}
          <div className="p-4">
            <h3 className="text-lg font-semibold truncate">{category.name}</h3>
            <p className="text-sm text-gray-600 truncate">
              {category.description || "No description available"}
            </p>
          </div>
          <div className="flex justify-between p-4 border-t border-gray-200">
            <button className="text-blue-500 hover:text-blue-700">Share</button>
            <button className="text-blue-500 hover:text-blue-700">
              Learn More
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
