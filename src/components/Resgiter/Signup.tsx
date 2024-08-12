import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaCheck } from "react-icons/fa";
import axios from "axios";
import { useSignupStore } from "../../middleware/register/useSignupStore";
interface SignupProps {
  title?: string;
  namePlaceholder?: string;
  emailPlaceholder?: string;
  passwordPlaceholder?: string;
  repasswordPlaceholder?: string;
  buttonText?: string;
  acceptConditionsText?: string;
}

const Signup: React.FC<SignupProps> = ({
  title = "Create Your Account",
  namePlaceholder = "Enter your full name",
  emailPlaceholder = "Enter your email",
  passwordPlaceholder = "Enter your password",
  repasswordPlaceholder = "Re-enter your password",
  buttonText = "Sign Up",
  acceptConditionsText = "I accept the terms and conditions",
}) => {
  const navigate = useNavigate();
  const {
    name,
    email,
    password,
    repassword,
    acceptConditions,
    setName,
    setEmail,
    setPassword,
    setRepassword,
    setAcceptConditions,
    resetForm,
  } = useSignupStore();

  const initialValues = {
    name,
    email,
    password,
    repassword,
    acceptConditions,
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Full Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
    repassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Re-enter Password is required"),
    acceptConditions: Yup.boolean().oneOf(
      [true],
      "You must accept the terms and conditions"
    ),
  });

  const handleSubmit = async (
    values: typeof initialValues,
    { resetForm: resetFormikForm }: { resetForm: () => void }
  ) => {
    try {
      // check again the sigm up is work or nots
      await axios.post("http://localhost:8080/api/v1/auth/signup", {
        email: values.email,
        name: values.name,
        password: values.password,
      });

      toast.success("Sign up successful!");
      setTimeout(() => {
        resetFormikForm();
        resetForm(); // Reset Zustand store
        navigate("/login");
      }, 2000);
    } catch (error) {
      toast.error("Signup failed. Please try again.");
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
          {({ isSubmitting, values, handleChange, handleBlur }) => {
            const password = values.password;
            const minLengthValid = password.length >= 8;
            const letterValid = /[A-Za-z]/.test(password);
            const numberValid = /\d/.test(password);
            const allValid = minLengthValid && letterValid && numberValid;

            return (
              <Form className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Full Name
                  </label>
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    placeholder={namePlaceholder}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleChange(e);
                      setName(e.target.value);
                    }}
                    onBlur={handleBlur}
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-600 text-sm"
                  />
                </div>
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
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleChange(e);
                      setEmail(e.target.value);
                    }}
                    onBlur={handleBlur}
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
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleChange(e);
                      setPassword(e.target.value);
                    }}
                    onBlur={handleBlur}
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-600 text-sm"
                  />
                  <div className="mt-2 space-y-1 text-sm">
                    <div
                      className={
                        minLengthValid ? "text-green-600" : "text-red-600"
                      }
                    >
                      {minLengthValid && <FaCheck className="inline mr-1" />}
                      Password must be at least 8 characters long
                    </div>
                    <div
                      className={
                        letterValid ? "text-green-600" : "text-red-600"
                      }
                    >
                      {letterValid && <FaCheck className="inline mr-1" />}
                      Password must contain at least one letter
                    </div>
                    <div
                      className={
                        numberValid ? "text-green-600" : "text-red-600"
                      }
                    >
                      {numberValid && <FaCheck className="inline mr-1" />}
                      Password must contain at least one number
                    </div>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="repassword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Re-enter Password
                  </label>
                  <Field
                    type="password"
                    id="repassword"
                    name="repassword"
                    placeholder={repasswordPlaceholder}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleChange(e);
                      setRepassword(e.target.value);
                    }}
                    onBlur={handleBlur}
                  />
                  <ErrorMessage
                    name="repassword"
                    component="div"
                    className="text-red-600 text-sm"
                  />
                </div>
                <div className="flex items-center">
                  <Field
                    type="checkbox"
                    id="acceptConditions"
                    name="acceptConditions"
                    className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    checked={values.acceptConditions}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleChange(e);
                      setAcceptConditions(e.target.checked);
                    }}
                    onBlur={handleBlur}
                  />
                  <label
                    htmlFor="acceptConditions"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    {acceptConditionsText}
                  </label>
                </div>
                <ErrorMessage
                  name="acceptConditions"
                  component="div"
                  className="text-red-600 text-sm"
                />
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  disabled={isSubmitting || !allValid}
                >
                  {buttonText}
                </button>
              </Form>
            );
          }}
        </Formik>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-green-600 hover:text-green-700 font-medium"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
