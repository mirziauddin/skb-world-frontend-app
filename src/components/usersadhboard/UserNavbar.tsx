import React from "react";
import {
  BsFillBellFill,
  BsFillEnvelopeFill,
  BsPersonCircle,
  BsSearch,
  BsJustify,
} from "react-icons/bs";

// Define the props interface
interface UserNavbarProps {
  OpenSidebar: () => void;
  userId: string; // Add the userId prop here
}

// Update the component to accept props of type UserNavbarProps
const UserNavbar: React.FC<UserNavbarProps> = ({ OpenSidebar, userId }) => {
  return (
    <header className="flex justify-between items-center p-4 bg-green-800 text-white">
      <div className="cursor-pointer">
        <BsJustify className="text-2xl" onClick={OpenSidebar} />
      </div>
      <div className="flex-1 flex justify-center">
        <BsSearch className="text-2xl cursor-pointer" />
      </div>
      <div className="flex items-center space-x-4">
        <BsFillBellFill className="text-2xl cursor-pointer" />
        <BsFillEnvelopeFill className="text-2xl cursor-pointer" />
        <BsPersonCircle className="text-2xl cursor-pointer" />
        <span>{userId}</span> {/* Display the userId if needed */}
      </div>
    </header>
  );
};

export default UserNavbar;
