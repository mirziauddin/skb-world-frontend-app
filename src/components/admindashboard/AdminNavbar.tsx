import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import {
  BsFillBellFill,
  BsFillEnvelopeFill,
  BsPersonCircle,
  BsJustify,
} from "react-icons/bs";

interface AdminNavbarProps {
  OpenSidebar: () => void;
  userId: string;
}

function AdminNavbar({ OpenSidebar, userId }: AdminNavbarProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();
  const { user, isUserLoading } = useAuth();

  const toggleProfileDropdown = () => {
    setIsProfileOpen((prev) => !prev);
  };

  const handleViewProfile = () => {
    if (user?.id) {
      navigate(`/admin/profile/${user.id}`); // Navigate with the user ID in the URL
    }
    setIsProfileOpen(false); // Close the dropdown after navigating
  };

  return (
    <header className="flex justify-between items-center p-4 bg-green-800 text-white relative">
      <div className="cursor-pointer">
        <BsJustify className="text-2xl" onClick={OpenSidebar} />
      </div>
      <div className="flex items-center space-x-4">
        <BsFillBellFill className="text-2xl cursor-pointer" />
        <BsFillEnvelopeFill className="text-2xl cursor-pointer" />
        <div className="relative">
          <BsPersonCircle
            className="text-2xl cursor-pointer"
            onClick={toggleProfileDropdown}
          />
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-lg">
              <pre
                className="p-2 cursor-pointer hover:bg-gray-400"
                onClick={handleViewProfile}
              >
                View Profile
              </pre>
            </div>
          )}
        </div>
      </div>
      <div className="ml-4">
        {isUserLoading ? <>Loading...</> : <span>{userId}</span>}
      </div>
    </header>
  );
}

export default AdminNavbar;
