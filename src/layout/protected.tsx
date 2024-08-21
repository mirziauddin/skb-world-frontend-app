import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";

const Protectedroute = () => {
  const { isUserLoading, user } = useAuth();
  const [isDelayOver, setIsDelayOver] = useState(false);
  console.log(user?.role);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDelayOver(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
  console.log(user?.role);
  if (!isDelayOver) {
    return (
      <>
        <div className="text-center h-screen">Loading... lorem100</div>
      </>
    );
  }
  console.log(user?.role);
  return user?.role === "ADMIN" ? <Outlet /> : <Navigate to="/login" />;
};

export default Protectedroute;
