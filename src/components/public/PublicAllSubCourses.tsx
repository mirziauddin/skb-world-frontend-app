import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils";
import { Button } from "@mui/base/Button";
import { useParams } from "react-router-dom";

type SubCategory = {
  id: string;
  name: string;
  description?: string;
  imageUpload?: string;
  createdAt?: string;
  updatedAt?: string;
};

export default function PublicAllSubCourses() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedCategoryId, setExpandedCategoryId] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (categoryId) {
      const fetchSubCategories = async () => {
        try {
          const response = await axios.get(
            `${BASE_URL}/subCatagory/category/${categoryId}`
          );
          setSubCategories(response.data);
          setLoading(false);
        } catch (err) {
          setError("Failed to fetch subcategories");
          setLoading(false);
        }
      };

      fetchSubCategories();
    }
  }, [categoryId]);

  const toggleDescription = (id: string) => {
    setExpandedCategoryId((prevId) => (prevId === id ? null : id));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4">
      {subCategories.map((subCategory) => (
        <div
          key={subCategory.id}
          className="bg-white shadow-md rounded-lg overflow-hidden"
        >
          {subCategory.imageUpload && (
            <img
              src={subCategory.imageUpload}
              alt={subCategory.name}
              className="w-full h-32 object-cover"
            />
          )}
          <div className="p-4">
            <h3 className="text-lg font-semibold truncate">
              {subCategory.name}
            </h3>
            <p className="text-sm text-gray-600">
              {expandedCategoryId === subCategory.id
                ? subCategory.description
                : `${
                    subCategory.description?.slice(0, 100) ||
                    "No description available"
                  }...`}
            </p>
            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center justify-center">
                {/* SVG for decoration */}
              </div>
              <hr className="border-t-2 border-gray-300 relative before:absolute before:top-2 before:left-0 before:w-1/2 before:h-1 before:bg-gray-500 after:absolute after:top-2 after:right-0 after:w-1/2 after:h-1 after:bg-gray-700" />
            </div>
            <pre className="text-sm text-gray-600">
              postDate :{" "}
              {new Date(subCategory.createdAt || "").toLocaleDateString()}
            </pre>
          </div>
          <div className="flex justify-between p-4 border-t border-gray-200">
            <button
              className="text-blue-500 hover:text-blue-700"
              onClick={() => toggleDescription(subCategory.id)}
            >
              {expandedCategoryId === subCategory.id
                ? "Show Less"
                : "Read More"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
