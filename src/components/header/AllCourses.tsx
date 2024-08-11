import React from "react";
import GridContainer from "./GridContainer";
import homeLogo from "../../assets/homelogo.svg";
import Pagination from "./Pagination";
import { usePaginationStore } from "../../middleware/header/usePaginationStore";

const gridData = [
  // Your grid data here
  {
    name: "Item 1",
    description: "Description for Item 1",
    author: "Author 1",
    price: "$10",
  },
  {
    name: "Item 2",
    description: "Description for Item 2",
    author: "Author 2",
    price: "$15",
  },
  // Add the rest of the items...
  {
    name: "Item 1",
    description: "Description for Item 1",
    author: "Author 1",
    price: "$10",
  },
  {
    name: "Item 2",
    description: "Description for Item 2",
    author: "Author 2",
    price: "$15",
  },
  {
    name: "Item 1",
    description: "Description for Item 1",
    author: "Author 1",
    price: "$10",
  },
  {
    name: "Item 2",
    description: "Description for Item 2",
    author: "Author 2",
    price: "$15",
  },
  {
    name: "Item 1",
    description: "Description for Item 1",
    author: "Author 1",
    price: "$10",
  },
  {
    name: "Item 2",
    description: "Description for Item 2",
    author: "Author 2",
    price: "$15",
  },
  {
    name: "Item 1",
    description: "Description for Item 1",
    author: "Author 1",
    price: "$10",
  },
  {
    name: "Item 2",
    description: "Description for Item 2",
    author: "Author 2",
    price: "$15",
  },
  {
    name: "Item 1",
    description: "Description for Item 1",
    author: "Author 1",
    price: "$10",
  },
  {
    name: "Item 2",
    description: "Description for Item 2",
    author: "Author 2",
    price: "$15",
  },
];

const AllCourses: React.FC = () => {
  const { currentPage, setCurrentPage } = usePaginationStore();
  const coursesPerPage = 10;

  // Calculate the courses to be displayed on the current page
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = gridData.slice(indexOfFirstCourse, indexOfLastCourse);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="w-full min-h-screen bg-white p-4 md:p-6 lg:p-8">
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
          Our Recent Courses
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
          logo={homeLogo}
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
