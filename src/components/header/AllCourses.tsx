import React, { useEffect, useState } from "react";
import GridContainer from "./GridContainer";
import Pagination from "./Pagination";
import { usePaginationStore } from "../../middleware/header/usePaginationStore";
import { BASE_URL } from "../../utils";

interface SubCategory {
  id: string;
  name: string;
  description?: string;
  imageUpload?: string;
  pdfUpload?: string;
  price?: number;
  createdAt: string;
  updatedAt: string;
  categoryId: string;
}

interface GridItem {
  name: string;
  description?: string; // Ensure it's optional
  author: string;
  price?: string;
  imageUpload?: string;
}

const AllCourses: React.FC = () => {
  const [gridData, setGridData] = useState<GridItem[]>([]);
  const { currentPage, setCurrentPage } = usePaginationStore();
  const coursesPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/subCatagory/`);
        const data: SubCategory[] = await response.json();

        // Map SubCategory data to GridItem structure with default values
        const mappedData: GridItem[] = data.map((item) => ({
          name: item.name,
          description: item.description || "No description available",
          author: "Unknown Author",
          price: item.price ? `$${item.price}` : "Free",
          imageUpload: item.imageUpload,
        }));

        setGridData(mappedData);
      } catch (error) {
        console.error("Error fetching the subcategories:", error);
      }
    };

    fetchData();
  }, []);

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = gridData.slice(indexOfFirstCourse, indexOfLastCourse);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="w-full min-h-screen bg-white p-4 md:p-6 lg:p-8 font-roboto">
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
          <span className="text-green-500">Recent</span>{" "}
          <span className="text-black">Courses</span>
        </h1>
        <p className="text-base md:text-lg lg:text-xl text-gray-600">
          Explore our latest offerings and find the perfect course to enhance
          your skills. Our curated selection is designed to meet your learning
          needs and help you achieve your goals.
        </p>
      </div>
      <div className="overflow-x-auto">
        <GridContainer
          gridData={currentCourses}
          // logo={homeLogo}
          buttonText="Purchase"
        />
      </div>
      <Pagination
        totalCourses={gridData.length}
        coursesPerPage={coursesPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default AllCourses;
