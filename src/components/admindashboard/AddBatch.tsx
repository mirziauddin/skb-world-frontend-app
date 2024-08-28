import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import AdminSideBar from "./AdminSideBar";
import AdminNavbar from "./AdminNavbar";

type Props = {};

export default function AddBatch({}: Props) {
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
        <form className="max-w-sm mx-auto">
          <div className="mb-5">
            <label
              htmlFor="large-input"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Large input
            </label>
            <input
              type="text"
              id="large-input"
              className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="base-input"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Base input
            </label>
            <input
              type="text"
              id="base-input"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="small-input"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Small input
            </label>
            <input
              type="text"
              id="small-input"
              className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
