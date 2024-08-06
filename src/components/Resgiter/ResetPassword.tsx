import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
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
  const initialValues = {
    previousPassword: "",
    newPassword: "",
    reenterNewPassword: "",
  };

  const validationSchema = Yup.object({
    previousPassword: Yup.string().required("Previous password is required"),
    newPassword: Yup.string().required("New password is required"),
    reenterNewPassword: Yup.string()
      .oneOf([Yup.ref("newPassword")], "Passwords must match")
      .required("Re-enter new password is required"),
  });

  const handleSubmit = (
    values: typeof initialValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    console.log("Resetting password with:", {
      previousPassword: values.previousPassword,
      newPassword: values.newPassword,
    });

    // Clear input fields
    resetForm();

    toast.success("Password reset successful!");
    alert(
      `Password reset successful with previous password: ${values.previousPassword} and new password: ${values.newPassword}`
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-500 via-white-500 to-white-500">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md flex flex-col justify-center">
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
                  htmlFor="previousPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Previous Password
                </label>
                <Field
                  type="password"
                  id="previousPassword"
                  name="previousPassword"
                  placeholder={previousPasswordPlaceholder}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                <ErrorMessage
                  name="previousPassword"
                  component="div"
                  className="text-red-600 text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  New Password
                </label>
                <Field
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  placeholder={newPasswordPlaceholder}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                />
                <ErrorMessage
                  name="newPassword"
                  component="div"
                  className="text-red-600 text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="reenterNewPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Re-enter New Password
                </label>
                <Field
                  type="password"
                  id="reenterNewPassword"
                  name="reenterNewPassword"
                  placeholder={reenterNewPasswordPlaceholder}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                />
                <ErrorMessage
                  name="reenterNewPassword"
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

export default ResetPassword;
