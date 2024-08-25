import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BsCart3,
  BsGrid1X2Fill,
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsFillGearFill,
  BsClockHistory,
  BsPersonDashFill,
} from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import useAuth from "../../hooks/useAuth";

type IconType = React.ComponentType<React.SVGProps<SVGSVGElement>>;

interface MenuItem {
  name: string;
  icon: IconType;
  path?: string;
  onClick?: () => void;
  dropdown?: MenuItem[];
}

interface UserSideBarProps {
  openSidebarToggle: boolean;
  OpenSidebar: () => void;
}

const UserSideBar: React.FC<UserSideBarProps> = ({
  openSidebarToggle,
  OpenSidebar,
}) => {
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleViewProfile = () => {
    navigate(`/user/profile/${user?.id}`);
    setSettingsOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const menuItems: MenuItem[] = [
    { name: "Dashboard", icon: BsGrid1X2Fill, path: "/userDashboard" },
    {
      name: "Purchase Courses",
      icon: BsFillArchiveFill,
      path: "/user/purchase/course",
    },
    {
      name: "Transactions & History",
      icon: BsClockHistory,
      path: "/user/payment/history",
    },
    {
      name: "MemberShip",
      icon: BsFillGrid3X3GapFill,
      path: "/user/membership",
    },
    {
      name: "Settings",
      icon: BsFillGearFill,
      dropdown: [
        { name: "Profile", icon: BsPersonDashFill, onClick: handleViewProfile },
        { name: "Logout", icon: FiLogOut, onClick: handleLogout },
      ],
    },
  ];

  return (
    <aside
      className={`bg-green-800 h-full transition-all duration-300 fixed text-white ${
        openSidebarToggle ? "w-64" : "w-0"
      } overflow-hidden`}
    >
      <div className="flex justify-between items-center px-8 pt-4 mb-8">
        <div className="text-white text-2xl font-bold flex items-center">
          <BsCart3 className="mr-2 text-3xl" /> Admin
        </div>
        <span
          className="text-red-500 ml-6 mt-2 cursor-pointer"
          onClick={OpenSidebar}
        >
          X
        </span>
      </div>

      <ul className="space-y-6">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className="px-8 group"
            onMouseEnter={() => item.dropdown && setSettingsOpen(true)}
            onMouseLeave={() => item.dropdown && setSettingsOpen(false)}
          >
            <div
              className="flex items-center text-gray-400 hover:text-white cursor-pointer"
              onClick={() => {
                if (item.path) navigate(item.path);
                if (item.onClick) item.onClick();
              }}
            >
              <item.icon className="mr-2 text-xl" /> {item.name}
            </div>
            {item.dropdown && settingsOpen && (
              <ul className="ml-8 mt-2 space-y-2">
                {item.dropdown.map((subItem, subIndex) => (
                  <li key={subIndex}>
                    <div
                      className="flex items-center text-gray-400 hover:text-white cursor-pointer"
                      onClick={() => {
                        if (subItem.onClick) subItem.onClick();
                      }}
                    >
                      <subItem.icon className="mr-2 text-xl" /> {subItem.name}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default UserSideBar;
