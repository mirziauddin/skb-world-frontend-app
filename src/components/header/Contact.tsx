import React from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContactFormStore } from "../../middleware/header/useContactFormStore";

interface ContactProps {
  buttonText?: string;
  successMessage?: string;
}

const Contact: React.FC<ContactProps> = ({
  buttonText = "Send Message",
  successMessage = "Message sent successfully!",
}) => {
  const {
    email,
    name,
    subject,
    message,
    errors,
    touched,
    setFieldValue,
    setFieldTouched,
    resetForm,
    validateForm,
  } = useContactFormStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log({ email, name, subject, message }); // Log form data to console
      toast.success(successMessage); // Show success toast message
      alert(
        `User Input Data:\n\nEmail: ${email}\nName: ${name}\nSubject: ${subject}\nMessage: ${message}`
      ); // Alert user input data

      // Clear form fields after submission
      resetForm();
    }
  };

  return (
    <div className="w-full min-h-screen bg-white p-4 md:p-6 lg:p-8 flex justify-center items-center">
      <form
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg"
        onSubmit={handleSubmit}
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
            value={email}
            onChange={(e) => setFieldValue("email", e.target.value)}
            onBlur={() => setFieldTouched("email", true)}
            required
          />
          {touched.email && errors.email ? (
            <div className="text-red-500 text-xs">{errors.email}</div>
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
            value={name}
            onChange={(e) => setFieldValue("name", e.target.value)}
            onBlur={() => setFieldTouched("name", true)}
            required
          />
          {touched.name && errors.name ? (
            <div className="text-red-500 text-xs">{errors.name}</div>
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
            value={subject}
            onChange={(e) => setFieldValue("subject", e.target.value)}
            onBlur={() => setFieldTouched("subject", true)}
            required
          />
          {touched.subject && errors.subject ? (
            <div className="text-red-500 text-xs">{errors.subject}</div>
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
            value={message}
            onChange={(e) => setFieldValue("message", e.target.value)}
            onBlur={() => setFieldTouched("message", true)}
            required
          />
          {touched.message && errors.message ? (
            <div className="text-red-500 text-xs">{errors.message}</div>
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
