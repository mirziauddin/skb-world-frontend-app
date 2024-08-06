import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface LoginProps {
  title?: string;
  emailPlaceholder?: string;
  passwordPlaceholder?: string;
  buttonText?: string;
  googleButtonText?: string;
  forgotPasswordText?: string;
  createAccountText?: string;
}

const Login: React.FC<LoginProps> = ({
  title = "Login to Your Account",
  emailPlaceholder = "Enter your email",
  passwordPlaceholder = "Enter your password",
  buttonText = "Login",
  googleButtonText = "Sign up with Google",
  forgotPasswordText = "Forgot Password?",
  createAccountText = "Don't have an account?",
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (email === "" || password === "") {
      toast.error("Please fill in all fields.");
      return;
    }

    // Simulate authentication
    const existingAccounts = ["user@example.com"];

    if (existingAccounts.includes(email)) {
      toast.success("Login successful!");

      // Clear input fields
      setEmail("");
      setPassword("");
    } else {
      // Clear input fields
      setEmail("");
      setPassword("");
      toast.info("Please create an account first.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">{title}</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
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
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder={passwordPlaceholder}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            {buttonText}
          </button>
        </form>
        <div className="mt-6 flex items-center justify-between">
          <hr className="w-full border-gray-300" />
          <span className="px-4 text-gray-500">or</span>
          <hr className="w-full border-gray-300" />
        </div>
        <button
          type="button"
          className="w-full mt-6 py-2 px-4 bg-red-600 text-white font-semibold rounded-md flex items-center justify-center space-x-2 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
        >
          <FaGoogle />
          <span>{googleButtonText}</span>
        </button>
        <div className="mt-6 text-center">
          <a href="#" className="text-sm text-blue-600 hover:underline">
            {forgotPasswordText}
          </a>
        </div>
        <div className="mt-2 text-center">
          <span className="text-sm text-gray-600">{createAccountText} </span>
          <Link to="/signup" className="text-sm text-blue-600 hover:underline">
            Create Account
          </Link>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;
