import { useState } from "react";
import UserSideBar from "../components/usersadhboard/UserSideBar";
import UserNavbar from "../components/usersadhboard/UserNavbar";
import UserHome from "../components/usersadhboard/UserHome";
import useAuth from "../hooks/useAuth";
type Props = {};

export default function UserDashboard({}: Props) {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const { user, isUserLoading } = useAuth();
  const userId = user?.id ?? ""; // Provide a fallback value
  console.log(isUserLoading);

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
        <UserNavbar OpenSidebar={OpenSidebar} userId={userId} />
        <UserHome />
      </div>
    </div>
  );
}
