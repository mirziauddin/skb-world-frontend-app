import React, { useState } from "react";
import { FaHistory } from "react-icons/fa";

import { BsPeopleFill, BsChevronDown } from "react-icons/bs";
import {
  FcButtingIn,
  FcConferenceCall,
  FcDataSheet,
  FcHome,
  FcManager,
  FcPaid,
  FcPlus,
  FcReading,
  FcReuse,
  FcRightUp2,
  FcServices,
} from "react-icons/fc";
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
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleViewProfile = () => {
    navigate(`/admin/profile/${user?.id}`, { replace: true });
    setOpenMenu(null);
  };

  const handleLogout = () => {
    logout(); // Call the logout function from useAuth
    navigate("/login"); // Redirect the user to the login page
  };

  const handleMouseEnter = (menuName: string) => {
    setOpenMenu(menuName);
  };

  const handleMouseLeave = () => {
    setOpenMenu(null);
  };

  const menuItems: MenuItem[] = [
    {
      name: "Dashboard",
      icon: FcDataSheet,
      onClick: () => navigate("/adminDashboard"),
    },
    {
      name: "Categories",
      icon: FcReuse,
      onClick: () => navigate("/adminCategory"),
    },
    {
      name: "SubCategories",
      icon: FcPaid,
      onClick: () => navigate("/adminSubCategory"),
    },
    {
      name: "AllUser",
      icon: BsPeopleFill,
      onClick: () => navigate("/adminAllUsers"),
    },
    {
      name: "Primium User",
      icon: FcButtingIn,
      onClick: () => navigate("/admin/premium/user"),
    },
    {
      name: "Batch",
      icon: FcReading,
      onClick: () => {}, // No navigation needed
      subItems: [
        {
          name: "NewBatch",
          icon: FcPlus,
          onClick: () => navigate("/admin/batch/add"),
        },
        {
          name: "All Batch",
          icon: FcConferenceCall,
          onClick: () => navigate("/admin/batch/all"),
        },
      ],
    },
    {
      name: "Payment History",
      icon: FaHistory,
      onClick: () => navigate("/payment/history/"),
    },
    {
      name: "Reports",
      icon: FcButtingIn,
      onClick: () => navigate("/admin/reports"),
    },
    {
      name: "Settings",
      icon: FcServices,
      onClick: () => {}, // No navigation needed
      subItems: [
        {
          name: "Profile",
          icon: FcManager,
          onClick: handleViewProfile,
        },
        {
          name: "Logout",
          icon: FcRightUp2,
          onClick: handleLogout,
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
          <FcHome className="mr-2 text-3xl" /> Admin
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
            onMouseEnter={() => item.subItems && handleMouseEnter(item.name)}
            onMouseLeave={() => item.subItems && handleMouseLeave()}
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
                    openMenu === item.name ? "rotate-180" : ""
                  }`}
                />
              )}
            </a>
            {item.subItems && (
              <ul
                className={`pl-8 mt-2 space-y-4 overflow-hidden transition-all duration-300 ease-in-out ${
                  openMenu === item.name
                    ? "max-h-[999px] opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
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
