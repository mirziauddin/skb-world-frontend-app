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

  // Format the createdAt date
  const formattedDate = new Date(profileData.createdAt).toLocaleString(
    "en-US",
    {
      dateStyle: "medium",
      timeStyle: "short",
    }
  );

  return (
    <div className="min-h-screen bg-green-800 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {/* Profile Picture Section */}
        <div className="flex flex-col items-center">
          <div className="relative">
            <img
              src={profileData.imageUpload || "https://via.placeholder.com/150"}
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
          <p className="text-gray-600">{profileData.role}</p>
          <p className="text-gray-600">Joining Date: {formattedDate}</p>
          {/* <p className="text-gray-600">{profileData.password}</p> */}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
