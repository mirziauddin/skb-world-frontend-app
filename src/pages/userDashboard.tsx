import React, { useState } from "react";

const UserDashboard: React.FC = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-3xl font-bold">User Dashboard</h1>
      {/* Add more user-specific content here */}
    </div>
  );
};

export default UserDashboard;
