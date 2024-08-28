import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { BASE_URL } from "../../utils";
import useAuth from "../../hooks/useAuth";
import { FcGoogle } from "react-icons/fc";

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
  forgotPasswordText = "Forgot Password",
  createAccountText = "Don't have an account? ",
}) => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, {
        email: values.email,
        password: values.password,
      });

      console.log(response.data); // Log the entire response

      if (response.data) {
        const { user, token } = response.data;
        setUser(user);
        localStorage.setItem("ACCESS_TOKEN", token);

        console.log("Hello", token);

        Swal.fire({
          icon: "success",
          title: "Successful",
          text: "You have successfully logged in",
        }).then(() => {
          setTimeout(() => {
            if (user.role === "ADMIN") {
              navigate("/adminDashboard");
            } else {
              navigate("/userDashboard");
            }
          }, 2000);
        });
      } else {
        toast.error(response.data?.message || "Login failed");
      }
    } catch (error) {
      const err = error as any;
      console.error("Login error:", err);
      toast.error(
        err.response?.data?.message || "An error occurred. Please try again."
      );
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
            <Form className="space-y-4 ">
              <div>
                <div className="flex flex-col items-center justify-center ">
                  <button
                    type="button"
                    className="text-white bg-green-700 hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mb-2"
                  >
                    <FcGoogle className="mr-3 bg-white  rounded-full h-6 w-6" />
                    Sign in with Google
                  </button>
                  <p className="text-sm mt-4">or</p>
                </div>

                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  <strong>Email</strong>
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
                  <strong>Password</strong>
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
            className="text-sm font-medium text-blue-600 hover:text-green-500"
          >
            {forgotPasswordText}
          </Link>
        </div>
        <div className="mt-4 text-center">
          {createAccountText}
          <Link
            to="/signup"
            className="text-sm font-medium text-blue-600 hover:text-green-500"
          >
            Click Here
          </Link>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
