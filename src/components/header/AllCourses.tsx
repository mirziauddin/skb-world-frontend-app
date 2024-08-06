import React from "react";
import GridContainer from "./GridContainer";
import homeLogo from "../../assets/homelogo.svg";

const gridData = [
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
    name: "Item 3",
    description: "Description for Item 3",
    author: "Author 3",
    price: "$20",
  },
  {
    name: "Item 4",
    description: "Description for Item 4",
    author: "Author 4",
    price: "$25",
  },
  {
    name: "Item 5",
    description: "Description for Item 5",
    author: "Author 5",
    price: "$30",
  },
  {
    name: "Item 6",
    description: "Description for Item 6",
    author: "Author 6",
    price: "$35",
  },
  {
    name: "Item 7",
    description: "Description for Item 7",
    author: "Author 7",
    price: "$40",
  },
  {
    name: "Item 8",
    description: "Description for Item 8",
    author: "Author 8",
    price: "$45",
  },
  {
    name: "Item 9",
    description: "Description for Item 9",
    author: "Author 9",
    price: "$50",
  },
];

const AllCourses: React.FC = () => {
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
          gridData={gridData}
          logo={homeLogo}
          buttonText="Purchase"
        />
      </div>
    </div>
  );
};

export default AllCourses;
