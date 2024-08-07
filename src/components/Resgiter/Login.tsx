import React from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import skbcompany from "../../assets/skbcompany2.png";

interface LoginProps {
  title?: string;
  emailPlaceholder?: string;
  passwordPlaceholder?: string;
  buttonText?: string;
  forgotPasswordText?: string;
  createAccountText?: string;
  imageSrc?: string;
}

const Login: React.FC<LoginProps> = ({
  title = "Login to Your Account",
  emailPlaceholder = "Enter your email",
  passwordPlaceholder = "Enter your password",
  buttonText = "Login",
  forgotPasswordText = "Forgot Password?",
  createAccountText = "Don't have an account?",
  imageSrc = "https://via.placeholder.com/500x500",
}) => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      const existingAccounts = ["user@example.com"];

      if (existingAccounts.includes(values.email)) {
        console.log("Form data:", values);
        alert(`Form data:\n${JSON.stringify(values, null, 2)}`);
        toast.success("Login successful!");
        formik.resetForm();
      } else {
        toast.info("Please create an account first.");
        formik.resetForm();
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-500 via-white-500 to-white-500">
      <div className="flex w-full max-w-5xl">
        {/* Form Section */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-6">{title}</h2>
            <form onSubmit={formik.handleSubmit} className="space-y-4">
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
                  name="email"
                  placeholder={emailPlaceholder}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-red-600">{formik.errors.email}</div>
                ) : null}
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
                  name="password"
                  placeholder={passwordPlaceholder}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-red-600">{formik.errors.password}</div>
                ) : null}
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
              >
                {buttonText}
              </button>
            </form>
            <div className="mt-6 text-center">
              <Link
                to="/forgotPassword"
                className="text-sm text-blue-600 hover:underline"
              >
                {forgotPasswordText}
              </Link>
            </div>
            <div className="mt-2 text-center">
              <span className="text-sm text-gray-600">
                {createAccountText}{" "}
              </span>
              <Link
                to="/signup"
                className="text-sm text-blue-600 hover:underline"
              >
                Create Account
              </Link>
            </div>
            <ToastContainer />
          </div>
        </div>
        {/* Image Section */}
        <div className=" md:flex-1">
          <img
            src={skbcompany}
            alt="Login Illustration"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
