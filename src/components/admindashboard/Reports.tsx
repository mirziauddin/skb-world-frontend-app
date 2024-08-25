import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import AdminSideBar from "./AdminSideBar";
import AdminNavbar from "./AdminNavbar";

type Props = {};

export default function Reports({}: Props) {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const { user, isUserLoading } = useAuth();
  const userId = user?.id ?? ""; // Provide a fallback value

  console.log("isUserLoading : ", isUserLoading);

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
        <AdminNavbar OpenSidebar={OpenSidebar} userId={userId} />
        <pre>Coming Soon......</pre>
      </div>
    </div>
  );
}
