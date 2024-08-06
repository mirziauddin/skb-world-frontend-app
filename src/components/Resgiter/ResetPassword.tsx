import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ResetPasswordProps {
  title?: string;
  previousPasswordPlaceholder?: string;
  newPasswordPlaceholder?: string;
  reenterNewPasswordPlaceholder?: string;
  buttonText?: string;
}

const ResetPassword: React.FC<ResetPasswordProps> = ({
  title = "Reset Password",
  previousPasswordPlaceholder = "Enter your previous password",
  newPasswordPlaceholder = "Enter new password",
  reenterNewPasswordPlaceholder = "Re-enter new password",
  buttonText = "Reset Password",
}) => {
  const [previousPassword, setPreviousPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [reenterNewPassword, setReenterNewPassword] = useState("");

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !previousPassword ||
      !newPassword ||
      newPassword !== reenterNewPassword
    ) {
      toast.error("Please fill in all fields correctly.");
      return;
    }

    // Logic to handle password reset (e.g., update password in the database)
    console.log("Resetting password with:", {
      previousPassword,
      newPassword,
    });

    // Clear input fields
    setPreviousPassword("");
    setNewPassword("");
    setReenterNewPassword("");

    toast.success("Password reset successful!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md flex flex-col justify-center">
        <h2 className="text-2xl font-bold text-center mb-6">{title}</h2>
        <form onSubmit={handleResetPassword} className="space-y-4">
          <div>
            <label
              htmlFor="previousPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Previous Password
            </label>
            <input
              type="password"
              id="previousPassword"
              placeholder={previousPasswordPlaceholder}
              value={previousPassword}
              onChange={(e) => setPreviousPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-700"
            >
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              placeholder={newPasswordPlaceholder}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label
              htmlFor="reenterNewPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Re-enter New Password
            </label>
            <input
              type="password"
              id="reenterNewPassword"
              placeholder={reenterNewPasswordPlaceholder}
              value={reenterNewPassword}
              onChange={(e) => setReenterNewPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            {buttonText}
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default ResetPassword;
