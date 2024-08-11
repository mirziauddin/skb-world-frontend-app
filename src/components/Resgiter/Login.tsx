import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface LoginProps {
  title?: string;
  emailPlaceholder?: string;
  passwordPlaceholder?: string;
  buttonText?: string;
  forgotPasswordText?: string;
  createAccountText?: string;
}

const Login: React.FC<LoginProps> = ({
  title = "Login to Your Account",
  emailPlaceholder = "Enter your email",
  passwordPlaceholder = "Enter your password",
  buttonText = "Login",
  forgotPasswordText = "Forgot Password?",
  createAccountText = "Don't have an account?",
}) => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/v1/auth/login",
          values
        );
        const { role } = response.data;

        // Store the role and other data in local storage
        localStorage.setItem("authData", JSON.stringify({ role }));

        // Show the success toast notification
        toast.success("Login successful!", {
          onClose: () => {
            setTimeout(() => {
              if (role === "ADMIN") {
                navigate("/adminDashboard");
              } else if (role === "USER") {
                navigate("/userDashboard");
              }
            }, 500); // Delay for 500ms to ensure toast is visible
          },
        });

        formik.resetForm();
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          toast.error(`Login failed: ${error.response.data.message}`);
        } else {
          toast.error("Login failed: An unknown error occurred");
        }
      }
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-sm w-full bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-bold mb-4">{title}</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder={emailPlaceholder}
              className="w-full px-3 py-2 border rounded"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 text-sm">{formik.errors.email}</div>
            ) : null}
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 mb-2">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder={passwordPlaceholder}
              className="w-full px-3 py-2 border rounded"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500 text-sm">
                {formik.errors.password}
              </div>
            ) : null}
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
          >
            {buttonText}
          </button>
        </form>
        <div className="mt-4 flex justify-between text-sm text-gray-600">
          <Link to="/forgot-password" className="hover:underline">
            {forgotPasswordText}
          </Link>
          <Link to="/register" className="hover:underline">
            {createAccountText}
          </Link>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;
