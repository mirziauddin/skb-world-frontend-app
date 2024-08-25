import {
  BsFillBellFill,
  BsFillEnvelopeFill,
  BsPersonCircle,
  BsJustify,
} from "react-icons/bs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function AdminNavbar({
  OpenSidebar,
}: {
  OpenSidebar: () => void;
  userId: string;
}) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  const toggleProfileDropdown = () => {
    setIsProfileOpen((prev) => !prev);
  };

  const { user, isUserLoading } = useAuth();
  console.log(isUserLoading);
  console.log(user?.id);

  const handleViewProfile = () => {
    navigate(`/admin/profile/${user?.id}`); // Navigate with the user ID in the URL
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
          DashBoard of {!user ? <>Loading...</> : <> {user?.name}</>}
        </div>
      </div>
    </header>
  );
}

export default AdminNavbar;
