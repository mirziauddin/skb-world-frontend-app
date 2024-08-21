import React, { useState } from "react";
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

type IconType = React.ComponentType<React.SVGProps<SVGSVGElement>>;

interface MenuItem {
  name: string;
  icon: IconType;
  href: string;
  dropdown?: MenuItem[];
}

interface AdminSideBarProps {
  openSidebarToggle: boolean;
  OpenSidebar: () => void;
}

function UserSideBar({ openSidebarToggle, OpenSidebar }: AdminSideBarProps) {
  const [settingsOpen, setSettingsOpen] = useState(false);

  const toggleSettings = () => {
    setSettingsOpen(!settingsOpen);
  };

  const menuItems: MenuItem[] = [
    { name: "Dashboard", icon: BsGrid1X2Fill, href: "adminDashboard" },
    {
      name: "Purchase Courses",
      icon: BsFillArchiveFill,
      href: "#",
    },
    {
      name: "Transactions & History",
      icon: BsClockHistory,
      href: "#",
    },
    {
      name: "MemberShip",
      icon: BsFillGrid3X3GapFill,
      href: "adminSubCategory",
    },
    {
      name: "Settings",
      icon: BsFillGearFill,
      href: "#",
      dropdown: [
        { name: "Profile", icon: BsPersonDashFill, href: "#profile" },
        { name: "Logout", icon: FiLogOut, href: "#logout" },
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
          <li key={index} className="px-8">
            <a
              href={item.href}
              className="flex items-center text-gray-400 hover:text-white"
              onClick={item.dropdown ? toggleSettings : undefined}
            >
              <item.icon className="mr-2 text-xl" /> {item.name}
            </a>
            {item.dropdown && settingsOpen && (
              <ul className="ml-8 mt-2 space-y-2">
                {item.dropdown.map((subItem, subIndex) => (
                  <li key={subIndex}>
                    <a
                      href={subItem.href}
                      className="flex items-center text-gray-400 hover:text-white"
                    >
                      <subItem.icon className="mr-2 text-xl" /> {subItem.name}
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

export default UserSideBar;
