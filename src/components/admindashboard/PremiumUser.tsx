import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import AdminSideBar from "./AdminSideBar";
import AdminNavbar from "./AdminNavbar";
import svgImage from "../../assets/addNew.svg";

type Batch = {
  slNo: number;
  groupName: string;
  groupCreateDate: string;
  groupStatus: "Active" | "Block";
};

type Props = {};

export default function PremiumUser({}: Props) {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [filterStatus, setFilterStatus] = useState<"Active" | "Block" | "All">(
    "All"
  );

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const { user, isUserLoading } = useAuth();
  const userId = user?.id ?? ""; // Provide a fallback value

  console.log("isUserLoading : ", isUserLoading);

  // Sample data
  const batchData: Batch[] = [
    // Uncomment and populate your data here
    // {
    //   slNo: 1,
    //   groupName: "Group A",
    //   groupCreateDate: "2024-01-01",
    //   groupStatus: "Active",
    // },
    // {
    //   slNo: 2,
    //   groupName: "Group B",
    //   groupCreateDate: "2024-02-01",
    //   groupStatus: "Block",
    // },
    // {
    //   slNo: 3,
    //   groupName: "Group C",
    //   groupCreateDate: "2024-03-01",
    //   groupStatus: "Active",
    // },
  ];

  // Filter data based on the selected status
  const filteredData = batchData.filter(
    (batch) => filterStatus === "All" || batch.groupStatus === filterStatus
  );

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

        <div className="relative overflow-x-auto mx-auto max-w-7xl p-4">
          <div className="mb-4">
            <label htmlFor="statusFilter" className="mr-2 text-gray-700">
              Filter by Status:
            </label>
            <select
              id="statusFilter"
              value={filterStatus}
              onChange={(e) =>
                setFilterStatus(e.target.value as "Active" | "Block" | "All")
              }
              className="border border-gray-300 rounded p-2"
            >
              <option value="All">All</option>
              <option value="Active">Active</option>
              <option value="Block">Block</option>
            </select>
          </div>

          {filteredData.length === 0 ? (
            <table className="w-full text-sm text-left text-white dark:text-gray-400">
              <thead className="text-xs text-white uppercase bg-gray-50 dark:bg-green-700 dark:text-white">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Sl No
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Group Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Group Create Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Group Status
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={4} className="text-center py-8">
                    <div className="flex items-center justify-center">
                      <img src={svgImage} alt="No data" className="h-96 w-96" />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          ) : (
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Sl No
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Group Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Group Create Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Group Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((batch) => (
                  <tr
                    key={batch.slNo}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {batch.slNo}
                    </th>
                    <td className="px-6 py-4">{batch.groupName}</td>
                    <td className="px-6 py-4">{batch.groupCreateDate}</td>
                    <td className="px-6 py-4">{batch.groupStatus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
