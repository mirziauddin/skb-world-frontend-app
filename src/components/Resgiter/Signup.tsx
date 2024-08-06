import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface SignupProps {
  title?: string;
  fullNamePlaceholder?: string;
  emailPlaceholder?: string;
  passwordPlaceholder?: string;
  repasswordPlaceholder?: string;
  buttonText?: string;
  acceptConditionsText?: string;
}

const Signup: React.FC<SignupProps> = ({
  title = "Create Your Account",
  fullNamePlaceholder = "Enter your full name",
  emailPlaceholder = "Enter your email",
  passwordPlaceholder = "Enter your password",
  repasswordPlaceholder = "Re-enter your password",
  buttonText = "Sign Up",
  acceptConditionsText = "I accept the terms and conditions",
}) => {
  const initialValues = {
    fullName: "",
    email: "",
    password: "",
    repassword: "",
    acceptConditions: false,
  };

  const validationSchema = Yup.object({
    fullName: Yup.string().required("Full Name is required"),
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

  const handleSubmit = (
    values: typeof initialValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    console.log("Form Data:", values);
    alert(`Submitted Values:
      Full Name: ${values.fullName}
      Email: ${values.email}
      Password: ${values.password}
      Re-enter Password: ${values.repassword}
      Accept Conditions: ${values.acceptConditions}
    `);
    toast.success("Sign up successful!");
    resetForm();
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
                  htmlFor="fullName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <Field
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder={fullNamePlaceholder}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                />
                <ErrorMessage
                  name="fullName"
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
                  className="mr-2"
                />
                <label htmlFor="acceptConditions" className="text-sm">
                  {acceptConditionsText}
                </label>
                <ErrorMessage
                  name="acceptConditions"
                  component="div"
                  className="text-red-600 text-sm"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 px-4 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                disabled={isSubmitting}
              >
                {buttonText}
              </button>
            </Form>
          )}
        </Formik>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Signup;
