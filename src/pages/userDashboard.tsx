import { useState } from "react";
import UserSideBar from "../components/usersadhboard/UserSideBar";
import UserNavbar from "../components/usersadhboard/UserNavbar";
import UserHome from "../components/usersadhboard/UserHome";

type Props = {};

export default function UserDashboard({}: Props) {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <div className="flex">
      <UserSideBar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />
      <div
        className={`flex-1 transition-all duration-300 ${
          openSidebarToggle ? "ml-64" : "ml-0"
        }`}
      >
        <UserNavbar OpenSidebar={OpenSidebar} />
        <UserHome />
      </div>
    </div>
  );
}
