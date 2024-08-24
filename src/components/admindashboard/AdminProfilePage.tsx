import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../utils";
import useAuth from "../../hooks/useAuth";

function ProfilePage() {
  const { userId } = useParams<{ userId: string }>(); // Get the userId from the URL
  const [profileData, setProfileData] = useState<any>(null);

  const { user, isUserLoading } = useAuth();
  console.log(isUserLoading);

  useEffect(() => {
    // Fetch profile data when component mounts
    console.log(userId);
    if (userId) {
      fetch(`${BASE_URL}/auth/${userId}`)
        .then((response) => response.json())
        .then((data) => setProfileData(data))
        .catch((error) => console.error("Error fetching profile data:", error));
    }
  }, [userId]);

  if (!profileData) {
    return <div>Loading...</div>; // Display loading message while data is being fetched
  }

  return (
    <div className="min-h-screen bg-green-800 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {/* Profile Picture Section */}
        <div className="flex flex-col items-center">
          <div className="relative">
            <img
              src={
                profileData.profilePicture || "https://via.placeholder.com/150"
              }
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover mb-4"
            />
            <label
              htmlFor="profilePicUpload"
              className="absolute bottom-0 right-0 bg-green-600 text-white p-2 rounded-full cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.232 5.232l3.536 3.536m1.768-4.768a2.5 2.5 0 113.536 3.536L5.75 21.036H2.25v-3.5L17.964 1.964z"
                />
              </svg>
            </label>
            <input
              type="file"
              id="profilePicUpload"
              className="hidden"
              accept="image/*"
            />
          </div>
          <h2 className="text-2xl font-semibold mb-2 text-gray-800">
            {profileData.name}
          </h2>
          <p className="text-gray-600">{profileData.email}</p>
        </div>

        {/* Profile Information Section */}
        <div className="mt-8 space-y-4">
          <div>
            <label className="text-gray-600 block mb-2">Full Name</label>
            <input
              type="text"
              value={profileData.name}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              readOnly
            />
          </div>
          <div>
            <label className="text-gray-600 block mb-2">Email</label>
            <input
              type="email"
              value={profileData.email}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              readOnly
            />
          </div>
          <div>
            <label className="text-gray-600 block mb-2">Phone Number</label>
            <input
              type="text"
              value={profileData.phone || "Not Available"}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              readOnly
            />
          </div>
        </div>
      </div>
      DashBoard of {!user ? <>Loading...</> : <> {user?.id}</>}
    </div>
  );
}

export default ProfilePage;
