import { useEffect } from "react";
import useCategoryStore from "./zustand/useCategoryStore";
import { Button } from "@mui/base/Button";
import { useNavigate } from "react-router-dom";
import heading from "../../assets/heading.png";

export default function PublicAllCourses() {
  const { categories, loading, error, fetchCategories } = useCategoryStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/subcategories/${categoryId}`);
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <img
          src={heading}
          alt="Company Logo"
          className="hidden md:block max-w-[900px] max-h-[200px] object-contain"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
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
              <h3
                className="text-lg font-semibold truncate cursor-pointer hover:text-gray-500"
                onClick={() => handleCategoryClick(category.id)}
              >
                {category.name}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-3">
                {category.description || "No description available"}
              </p>
              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-gray-500"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 4.75a.75.75 0 011.5 0v3.5a.75.75 0 01-1.5 0v-3.5zm0 11a.75.75 0 011.5 0v3.5a.75.75 0 01-1.5 0v-3.5zm-5.5-5.5a.75.75 0 010-1.5H10a.75.75 0 010 1.5H6.5zm11 0a.75.75 0 010-1.5H18a.75.75 0 010 1.5h-3.5zm-8.86-4.5l2.475 2.475a.75.75 0 11-1.06 1.06L6.58 5.81a.75.75 0 011.06-1.06zm10.26 10.26a.75.75 0 01-1.06 0L14.25 14a.75.75 0 011.06-1.06L18.61 15a.75.75 0 010 1.06zm-10.26 0L7.81 14.25a.75.75 0 011.06-1.06l2.475 2.475a.75.75 0 11-1.06 1.06L7.81 15.06zm10.26-10.26L14.25 7.81a.75.75 0 01-1.06-1.06L15.66 4.275a.75.75 0 111.06 1.06z" />
                  </svg>
                </div>
                <hr className="border-t-2 border-gray-300 relative before:absolute before:top-2 before:left-0 before:w-1/2 before:h-1 before:bg-gray-500 after:absolute after:top-2 after:right-0 after:w-1/2 after:h-1 after:bg-gray-700" />
              </div>
              <div className="flex justify-between items-center">
                <pre className="text-sm text-gray-600">
                  postDate:{" "}
                  {new Date(category.createdAt || "").toLocaleDateString()}
                </pre>
                <Button
                  type="button"
                  className={`text-white text-sm py-1 px-3 rounded-full bg-green-500 hover:bg-green-300`}
                  onClick={() => handleCategoryClick(category.id)}
                >
                  Click here
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
