import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ForgotPasswordProps {
  title?: string;
  emailPlaceholder?: string;
  buttonText?: string;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({
  title = "Forgot Password",
  emailPlaceholder = "Enter your email",
  buttonText = "Forgot Password",
}) => {
  const [email, setEmail] = useState("");

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setEmail("");
      toast.error("Please enter your email.");
      return;
    }

    // Logic to handle password reset (e.g., send an email to the user)
    console.log("Password reset request for email:", email);
    toast.success("Password reset email sent!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md flex flex-col justify-center">
        <h2 className="text-2xl font-bold text-center mb-6">{title}</h2>
        <form onSubmit={handleResetPassword} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Enter Your Email
            </label>
            <input
              type="email"
              id="email"
              placeholder={emailPlaceholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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

export default ForgotPassword;
