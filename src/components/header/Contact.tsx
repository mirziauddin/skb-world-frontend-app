import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import svgImage from "../../assets/contact.svg";

const Contact: React.FC = () => {
  const initialValues = {
    email: "",
    name: "",
    subject: "",
    message: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    name: Yup.string().required("Required"),
    subject: Yup.string().required("Required"),
    message: Yup.string().required("Required"),
  });

  const handleSubmit = (values: typeof initialValues, { resetForm }: any) => {
    console.log(values);
    toast.success("Message sent successfully!");
    alert(
      `User Input Data:\n\nEmail: ${values.email}\nName: ${values.name}\nSubject: ${values.subject}\nMessage: ${values.message}`
    );
    resetForm();
  };

  return (
    <div className="w-full min-h-screen bg-white p-8 flex flex-col md:flex-row justify-center items-center font-roboto">
      {/* Left Side - Contact Form */}
      <div className="w-full md:w-1/2 p-4">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="bg-white p-6 rounded-lg w-full">
              <h2 className="text-2xl font-bold mb-4 text-black">
                <span className="text-green-500">Contact</span>{" "}
                <span className="text-black">Us</span>
              </h2>
              <div className="mb-4">
                <label
                  className="block text-sm font-bold mb-2 text-black"
                  htmlFor="email"
                >
                  Enter email address:
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="w-full p-2 border rounded text-sm text-black bg-slate-200"
                  placeholder="Enter your email address"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-sm font-bold mb-2 text-black "
                  htmlFor="name"
                >
                  Enter name:
                </label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  className="w-full p-2 border rounded text-sm text-black bg-slate-200"
                  placeholder="Enter your name"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-sm font-bold mb-2 text-black "
                  htmlFor="subject"
                >
                  Subject:
                </label>
                <Field
                  type="text"
                  id="subject"
                  name="subject"
                  className="w-full p-2 border rounded text-sm text-black bg-slate-200"
                  placeholder="Enter subject"
                />
                <ErrorMessage
                  name="subject"
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-sm font-bold mb-2 text-black "
                  htmlFor="message"
                >
                  Message :
                </label>
                <Field
                  as="textarea"
                  id="message"
                  name="message"
                  className="w-full p-2 border rounded text-sm text-black bg-slate-200"
                  placeholder="Enter your message"
                />
                <ErrorMessage
                  name="message"
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div>
              <button
                type="submit"
                className="bg-green-600 text-white py-1 px-2 text-sm rounded hover:bg-green-700 "
                disabled={isSubmitting}
              >
                Send Message
              </button>
            </Form>
          )}
        </Formik>
      </div>
      {/* Right Side - SVG Image */}
      <div className="w-full md:w-1/2 flex justify-center items-center p-4 animate-zoomInOut">
        <img
          src={svgImage}
          alt="Contact Illustration"
          className="w-full h-auto max-w-xs md:max-w-md"
        />
      </div>
      <ToastContainer />
    </div>
  );
};

export default Contact;
