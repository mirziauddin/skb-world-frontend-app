import React, { useState } from "react";
import {
  BsCart3,
  BsGrid1X2Fill,
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsListCheck,
  BsMenuButtonWideFill,
  BsFillGearFill,
  BsPersonCircle,
  BsChevronDown,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

type IconType = React.ComponentType<React.SVGProps<SVGSVGElement>>;

interface MenuItem {
  name: string;
  icon: IconType;
  onClick?: () => void;
  subItems?: MenuItem[];
}

interface AdminSideBarProps {
  openSidebarToggle: boolean;
  OpenSidebar: () => void;
}

function AdminSideBar({ openSidebarToggle, OpenSidebar }: AdminSideBarProps) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleViewProfile = () => {
    navigate(`/admin/profile/${user?.id}`, { replace: true });
    setIsSettingsOpen(false);
  };

  const handleLogout = () => {
    logout(); // Call the logout function from useAuth
    navigate("/login"); // Redirect the user to the login page
  };

  const handleMouseEnter = () => {
    setTimeout(() => {
      setIsSettingsOpen(true);
    }, 150); // Add a 1.5-second delay before opening the settings dropdown
  };

  const handleMouseLeave = () => {
    setIsSettingsOpen(false);
  };

  const handleCategoryClick = () => {
    navigate("/adminCategory"); // Navigate to the Categories page without reloading
  };

  const menuItems: MenuItem[] = [
    {
      name: "Dashboard",
      icon: BsGrid1X2Fill,
      onClick: () => navigate("/adminDashboard"),
    },
    {
      name: "Categories",
      icon: BsFillArchiveFill,
      onClick: handleCategoryClick,
    },
    {
      name: "SubCategories",
      icon: BsFillGrid3X3GapFill,
      onClick: () => navigate("/adminSubCategory"),
    },
    {
      name: "AllUser",
      icon: BsPeopleFill,
      onClick: () => navigate("/adminAllUsers"),
    },
    {
      name: "Payment History",
      icon: BsListCheck,
      onClick: () => navigate("/payment/history/"),
    },
    {
      name: "Reports",
      icon: BsMenuButtonWideFill,
      onClick: () => navigate("/admin/reports"),
    },
    {
      name: "Settings",
      icon: BsFillGearFill,
      onClick: () => {}, // No navigation needed
      subItems: [
        {
          name: "Profile",
          icon: BsPersonCircle,
          onClick: handleViewProfile,
        },
        {
          name: "Logout",
          icon: BsFillGearFill,
          onClick: handleLogout, // Trigger the logout function on click
        },
      ],
    },
  ];

  return (
    <aside
      className={`bg-green-800 h-full transition-all duration-300 fixed ${
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
            className="px-8"
            key={index}
            onMouseEnter={
              item.name === "Settings" ? handleMouseEnter : undefined
            }
            onMouseLeave={
              item.name === "Settings" ? handleMouseLeave : undefined
            }
          >
            <a
              href="#"
              className="flex items-center text-white hover:text-black"
              onClick={(e) => {
                e.preventDefault();
                if (item.onClick) item.onClick();
              }}
            >
              <item.icon className="mr-2 text-xl" /> {item.name}
              {item.subItems && (
                <BsChevronDown
                  className={`ml-auto transform transition-transform ${
                    isSettingsOpen && item.name === "Settings"
                      ? "rotate-180"
                      : ""
                  }`}
                />
              )}
            </a>
            {item.subItems && isSettingsOpen && item.name === "Settings" && (
              <ul className="pl-8 mt-2 space-y-4">
                {item.subItems.map((subItem, subIndex) => (
                  <li key={subIndex}>
                    <a
                      href="#"
                      className="flex items-center text-white hover:text-black"
                      onClick={(e) => {
                        e.preventDefault();
                        if (subItem.onClick) subItem.onClick();
                      }}
                    >
                      <subItem.icon className="mr-2 text-lg" /> {subItem.name}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default AdminSideBar;
