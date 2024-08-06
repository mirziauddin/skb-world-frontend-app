import React from "react";
import homeLogo from "../../assets/homelogo.svg"; // Adjust the path if needed

type GridItem = {
  name: string;
  description: string;
  author: string;
  price: string;
};

interface GridContainerProps {
  gridData: GridItem[];
  logo: string;
  buttonText: string;
}

const GridContainer: React.FC<GridContainerProps> = ({
  gridData,
  logo,
  buttonText,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-4">
      {gridData.map((item, index) => (
        <div
          key={index}
          className="border p-4 rounded-lg shadow-lg flex flex-col items-center max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg w-full transition-transform transform hover:scale-105"
        >
          <img src={logo} alt="Logo" className="w-16 h-16 mb-4" />
          <h2 className="text-sm font-bold mb-2">{item.name.toLowerCase()}</h2>
          <p className="text-xs mb-2">{item.description}</p>
          <p className="text-sm text-gray-500 mb-2">{item.author}</p>
          <p className="text-lg font-semibold mb-2">{item.price}</p>
          <button className="bg-green-600 text-white py-2 px-4 text-center text-sm rounded hover:bg-green-700">
            {buttonText}
          </button>
        </div>
      ))}
    </div>
  );
};

export default GridContainer;
