import { useState, useEffect } from "react";
import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsFillBellFill,
} from "react-icons/bs";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { BASE_URL } from "../../utils";

function AdminHome() {
  const { user, isUserLoading } = useAuth();
  console.log(isUserLoading);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalCatagories, setTotalCatagories] = useState(0);
  const [totalSubCatagories, setTotalSubCatagories] = useState(0);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/auth`);
      setTotalUsers(response.data.length); // Assuming response.data is an array of users
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  const fetchCatagories = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/catagory`);
      setTotalCatagories(response.data.length); // Assuming response.data is an array of users
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  const fetchSubCatagories = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/subCatagory`);
      setTotalSubCatagories(response.data.length); // Assuming response.data is an array of users
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  // Fetch total user count
  useEffect(() => {
    fetchUsers();
    fetchCatagories();
    fetchSubCatagories();
  }, []);

  return (
    <main className="flex flex-col p-5 bg-green-900 text-white h-full overflow-y-auto">
      <div className="text-xl font-bold mb-5">DASHBOARD</div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-blue-700 p-4 rounded shadow-lg shadow-black hover:shadow-white transform hover:scale-105 transition-transform duration-300">
          <div className="flex justify-between items-center">
            <h3>TOTAL USER</h3>
            <BsPeopleFill className="text-2xl" />
          </div>
          <h1 className="text-3xl">{totalUsers}</h1>
        </div>

        <div className="bg-orange-700 p-4 rounded shadow-lg shadow-black hover:shadow-white transform hover:scale-105 transition-transform duration-300">
          <div className="flex justify-between items-center">
            <h3>PREMIUM USER</h3>
            <BsFillGrid3X3GapFill className="text-2xl" />
          </div>
          <h1 className="text-3xl">12</h1>
        </div>
        <div className="bg-green-700 p-4 rounded shadow-lg shadow-black hover:shadow-white transform hover:scale-105 transition-transform duration-300">
          <div className="flex justify-between items-center">
            <h3>TOTAL CATEGORIES</h3>
            <BsFillArchiveFill className="text-2xl" />
          </div>
          <h1 className="text-3xl">{totalCatagories}</h1>
        </div>
        <div className="bg-red-700 p-4 rounded shadow-lg shadow-black hover:shadow-white transform hover:scale-105 transition-transform duration-300">
          <div className="flex justify-between items-center">
            <h3>TOTAL SUBCATEGORIES</h3>
            <BsFillBellFill className="text-2xl" />
          </div>
          <h1 className="text-3xl">{totalSubCatagories}</h1>
        </div>
      </div>
      DashBoard of {!user ? <>Loading...</> : <> {user?.name}</>}
    </main>
  );
}

export default AdminHome;
