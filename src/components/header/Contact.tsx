import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ContactProps {
  initialEmail?: string;
  initialName?: string;
  initialSubject?: string;
  initialMessage?: string;
  buttonText?: string;
  successMessage?: string;
}

const Contact: React.FC<ContactProps> = ({
  initialEmail = "",
  initialName = "",
  initialSubject = "",
  initialMessage = "",
  buttonText = "Send Message",
  successMessage = "Message sent successfully!",
}) => {
  const formik = useFormik({
    initialValues: {
      email: initialEmail,
      name: initialName,
      subject: initialSubject,
      message: initialMessage,
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      name: Yup.string().required("Required"),
      subject: Yup.string().required("Required"),
      message: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      console.log(values); // Log form data to console
      toast.success(successMessage); // Show success toast message
      alert(
        `User Input Data:\n\nEmail: ${values.email}\nName: ${values.name}\nSubject: ${values.subject}\nMessage: ${values.message}`
      ); // Alert user input data

      // Clear form fields after submission
      formik.resetForm();
    },
  });

  return (
    <div className="w-full min-h-screen bg-white p-4 md:p-6 lg:p-8 flex justify-center items-center">
      <form
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg"
        onSubmit={formik.handleSubmit}
      >
        <h2
          className="text-2xl font-bold mb-4 text-black"
          style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.3)" }}
        >
          Recipient: Administrator
        </h2>
        <div className="mb-4">
          <label
            className="block text-sm font-bold mb-2 text-black"
            style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.3)" }}
            htmlFor="email"
          >
            Your email address:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full p-2 border rounded text-sm text-black"
            placeholder="Enter your email address"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-500 text-xs">{formik.errors.email}</div>
          ) : null}
        </div>
        <div className="mb-4">
          <label
            className="block text-sm font-bold mb-2 text-black"
            style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.3)" }}
            htmlFor="name"
          >
            Your name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full p-2 border rounded text-sm text-black"
            placeholder="Enter your name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="text-red-500 text-xs">{formik.errors.name}</div>
          ) : null}
        </div>
        <div className="mb-4">
          <label
            className="block text-sm font-bold mb-2 text-black"
            style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.3)" }}
            htmlFor="subject"
          >
            Subject:
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            className="w-full p-2 border rounded text-sm text-black"
            placeholder="Enter subject"
            value={formik.values.subject}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          {formik.touched.subject && formik.errors.subject ? (
            <div className="text-red-500 text-xs">{formik.errors.subject}</div>
          ) : null}
        </div>
        <div className="mb-4">
          <label
            className="block text-sm font-bold mb-2 text-black"
            style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.3)" }}
            htmlFor="message"
          >
            Message body:
          </label>
          <textarea
            id="message"
            name="message"
            className="w-full p-2 border rounded text-sm text-black"
            placeholder="Enter your message"
            value={formik.values.message}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          {formik.touched.message && formik.errors.message ? (
            <div className="text-red-500 text-xs">{formik.errors.message}</div>
          ) : null}
        </div>
        <p className="text-xs mb-4 text-gray-600">
          This message will be sent as plain text, do not include any HTML or
          BBCode. The return address for this message will be set to your email
          address.
        </p>
        <button
          type="submit"
          className="bg-green-600 text-white py-1 px-2 text-sm rounded hover:bg-green-700"
        >
          {buttonText}
        </button>
      </form>
      <ToastContainer /> {/* Toast container to display messages */}
    </div>
  );
};

export default Contact;
