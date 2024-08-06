import React, { useState } from "react";

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
  const [email, setEmail] = useState<string>(initialEmail);
  const [name, setName] = useState<string>(initialName);
  const [subject, setSubject] = useState<string>(initialSubject);
  const [message, setMessage] = useState<string>(initialMessage);
  const [isMessageSent, setIsMessageSent] = useState<boolean>(false);
  const [formData, setFormData] = useState<
    Array<{ email: string; name: string; subject: string; message: string }>
  >([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newEntry = { email, name, subject, message };
    setFormData([...formData, newEntry]);

    console.log([...formData, newEntry]);

    setIsMessageSent(true);

    setTimeout(() => {
      setIsMessageSent(false);
    }, 3000);

    // Clear form fields after submission
    setEmail("");
    setName("");
    setSubject("");
    setMessage("");
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
            className="w-full p-2 border rounded text-sm text-black"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
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
            className="w-full p-2 border rounded text-sm text-black"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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
            className="w-full p-2 border rounded text-sm text-black"
            placeholder="Enter subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
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
            className="w-full p-2 border rounded text-sm text-black"
            placeholder="Enter your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
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
        {isMessageSent && (
          <div className="mt-4 p-2 bg-green-100 border border-green-400 text-green-700 text-sm rounded">
            {successMessage}
          </div>
        )}
      </form>
    </div>
  );
};

export default Contact;
