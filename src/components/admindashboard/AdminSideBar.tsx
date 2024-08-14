import React from "react";
import {
  BsCart3,
  BsGrid1X2Fill,
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsListCheck,
  BsMenuButtonWideFill,
  BsFillGearFill,
} from "react-icons/bs";

type IconType = React.ComponentType<React.SVGProps<SVGSVGElement>>;

interface MenuItem {
  name: string;
  icon: IconType;
  href: string;
}

interface AdminSideBarProps {
  openSidebarToggle: boolean;
  OpenSidebar: () => void;
}

function AdminSideBar({ openSidebarToggle, OpenSidebar }: AdminSideBarProps) {
  const menuItems: MenuItem[] = [
    { name: "Dashboard", icon: BsGrid1X2Fill, href: "adminDashboard" },
    { name: "Categories", icon: BsFillArchiveFill, href: "adminCategory" },
    {
      name: "SubCategories",
      icon: BsFillGrid3X3GapFill,
      href: "adminSubCategory",
    },
    { name: "AllUser", icon: BsPeopleFill, href: "#" },
    { name: "Payment History", icon: BsListCheck, href: "#" },
    { name: "Reports", icon: BsMenuButtonWideFill, href: "#" },
    { name: "Settings", icon: BsFillGearFill, href: "#" },
  ];

  return (
    <aside
      className={`bg-gray-800 h-full transition-all duration-300 fixed ${
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
          <li className="px-8" key={index}>
            <a
              href={item.href}
              className="flex items-center text-gray-400 hover:text-white"
            >
              <item.icon className="mr-2 text-xl" /> {item.name}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default AdminSideBar;
