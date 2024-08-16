import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../../utils";

interface UpdateUserFormProps {
  userId: string;
  initialEmail: string;
  initialName: string;
  onUpdateUser: () => void;
  onClose: () => void;
}

export default function UpdateUserForm({
  userId,
  initialEmail,
  initialName,
  onUpdateUser,
  onClose,
}: UpdateUserFormProps) {
  const [email, setEmail] = useState(initialEmail);
  const [name, setName] = useState(initialName);

  const handleUpdate = async () => {
    try {
      await axios.put(`${BASE_URL}/auth/${userId}`, {
        email,
        name,
      });
      onUpdateUser();
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-md shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Update User</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleUpdate}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mr-2"
          >
            Update
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-black py-2 px-4 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
