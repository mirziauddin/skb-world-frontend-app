import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { CgProfile } from "react-icons/cg";
import { BsFillBellFill } from "react-icons/bs";
import { FcDatabase, FcSms } from "react-icons/fc";

interface AdminNavbarProps {
  OpenSidebar: () => void;
  userId: string;
}
function AdminNavbar({ OpenSidebar, userId }: AdminNavbarProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();
  const { user, isUserLoading } = useAuth();
  console.log(isUserLoading);

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
        <FcDatabase className="text-2xl" onClick={OpenSidebar} />
      </div>
      <div className="flex items-end space-x-4 ml-auto">
        <BsFillBellFill className="text-2xl cursor-pointer" />
        <FcSms className="text-2xl cursor-pointer" />
        <div className="relative">
          <CgProfile
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
        <span>{userId}</span>
      </div>
    </header>
  );
}

export default AdminNavbar;
