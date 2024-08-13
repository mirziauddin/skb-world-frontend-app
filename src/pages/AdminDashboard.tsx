import AdminHome from "../components/admindashboard/AdminHome";
import AdminNavbar from "../components/admindashboard/AdminNavbar";
import AdminSideBar from "../components/admindashboard/AdminSideBar";
import { useState } from "react";

type Props = {};

export default function AdminDashboard({}: Props) {
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
        <AdminHome />
      </div>
    </div>
  );
}
