import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { BASE_URL } from "../../utils";
import useAuthStore from "../../middleware/register/useAuthStore";

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
  const { setAuth, setRole } = useAuthStore();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().required("Required"),
  });

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, values);
      const { token, role } = response.data;
      localStorage.setItem("authData", JSON.stringify({ token, role }));
      setAuth(true, role);
      setRole(role);
      toast.success("Login successful!");
      setTimeout(() => {
        if (role === "ADMIN") {
          navigate("/adminDashboard");
        } else {
          navigate("/userDashboard");
        }
      }, 2000); // Delay for toast display
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-500 via-white-500 to-white-500">
      <div className="bg-white p-8 m-14 rounded-lg shadow-lg w-full max-w-md flex flex-col justify-center">
        <h2 className="text-2xl font-bold text-center mb-6">{title}</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  placeholder={emailPlaceholder}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-600 text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  placeholder={passwordPlaceholder}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-600 text-sm"
                />
              </div>
              <button
                type="submit"
                className={`w-full text-white font-bold py-2 px-4 rounded ${
                  !isSubmitting
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                disabled={isSubmitting}
              >
                {buttonText}
              </button>
            </Form>
          )}
        </Formik>
        <div className="mt-4 text-center">
          <Link
            to="/forgot-password"
            className="text-sm font-medium text-green-600 hover:text-green-500"
          >
            {forgotPasswordText}
          </Link>
        </div>
        <div className="mt-4 text-center">
          <Link
            to="/register"
            className="text-sm font-medium text-green-600 hover:text-green-500"
          >
            {createAccountText}
          </Link>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
