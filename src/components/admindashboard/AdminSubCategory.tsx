import { useState } from "react";
import AdminSideBar from "./AdminSideBar";
import AdminNavbar from "./AdminNavbar";

type Props = {};

export default function AdminSubCategory({}: Props) {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  return (
    <div className="flex">
      <AdminSideBar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />
      <div
        className={`flex-1 transition-all duration-300 ${
          openSidebarToggle ? "ml-64" : "ml-0"
        }`}
      >
        <AdminNavbar OpenSidebar={OpenSidebar} />
        <h1>Coming soon....</h1>
      </div>
    </div>
  );
}
