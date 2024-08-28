import React from "react";
import { useNavigate } from "react-router-dom";

type GridItem = {
  name: string;
  description?: string;
  author: string;
  price?: string;
  imageUpload?: string;
};

interface GridContainerProps {
  gridData: GridItem[];
  buttonText: string;
}

const GridContainer: React.FC<GridContainerProps> = ({
  gridData,
  buttonText,
}) => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/login");
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-4">
      {gridData.map((item, index) => (
        <div
          key={index}
          className="bg-gradient-to-r from-green-200 to-green-600 border p-4 rounded-lg shadow-lg flex flex-col items-center max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg w-full transition-transform transform hover:scale-105"
          style={{ height: "100%" }} // Ensures the card takes full height
        >
          <img
            src={item.imageUpload ? item.imageUpload : "defaultImageUrl"} // Use a default image if imageUpload is undefined
            alt={item.name}
            className="w-16 h-16 mb-4"
          />
          <h2 className="text-sm font-bold mb-2">{item.name.toLowerCase()}</h2>
          <p className="text-xs mb-2">
            {item.description || "No description available"}
          </p>
          <pre className="text-sm text-gray-500 mb-2">By Admin</pre>
          <p className="text-lg font-semibold mb-4">{item.price || "Free"}</p>
          <div className="mt-auto">
            {" "}
            {/* Pushes the button to the bottom */}
            <button
              className="bg-green-600 text-white py-2 px-4 text-center text-sm rounded hover:bg-green-700"
              onClick={handleNavigation}
            >
              {buttonText}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GridContainer;
