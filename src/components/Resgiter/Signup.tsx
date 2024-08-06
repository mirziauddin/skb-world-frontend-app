import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface SignupProps {
  title?: string;
  fullNamePlaceholder?: string;
  emailPlaceholder?: string;
  phoneNoPlaceholder?: string;
  villagePlaceholder?: string;
  townPlaceholder?: string;
  statePlaceholder?: string;
  pinPlaceholder?: string;
  passwordPlaceholder?: string;
  repasswordPlaceholder?: string;
  buttonText?: string;
  acceptConditionsText?: string;
}

const Signup: React.FC<SignupProps> = ({
  title = "Create Your Account",
  fullNamePlaceholder = "Enter your full name",
  emailPlaceholder = "Enter your email",
  phoneNoPlaceholder = "Enter your phone number",
  villagePlaceholder = "Enter your village",
  townPlaceholder = "Enter your town",
  statePlaceholder = "Enter your state",
  pinPlaceholder = "Enter your PIN",
  passwordPlaceholder = "Enter your password",
  repasswordPlaceholder = "Re-enter your password",
  buttonText = "Sign Up",
  acceptConditionsText = "I accept the terms and conditions",
}) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [village, setVillage] = useState("");
  const [town, setTown] = useState("");
  const [state, setState] = useState("");
  const [pin, setPin] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [acceptConditions, setAcceptConditions] = useState(false);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !fullName ||
      !email ||
      !phoneNo ||
      !village ||
      !town ||
      !state ||
      !pin ||
      !password ||
      password !== repassword ||
      !acceptConditions
    ) {
      toast.error("Please fill in all fields correctly.");
      return;
    }

    const formData = {
      fullName,
      email,
      phoneNo,
      village,
      town,
      state,
      pin,
      password,
    };

    console.log("Form Data:", formData);
    toast.success("Sign up successful!");
    setFullName("");
    setEmail("");
    setPhoneNo("");
    setVillage("");
    setTown("");
    setState("");
    setPin("");
    setPassword("");
    setRepassword("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      <div className="bg-white p-8 m-14 rounded-lg shadow-lg w-full max-w-md flex flex-col justify-center">
        <h2 className="text-2xl font-bold text-center mb-6">{title}</h2>
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              placeholder={fullNamePlaceholder}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
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
              placeholder={emailPlaceholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label
              htmlFor="phoneNo"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNo"
              placeholder={phoneNoPlaceholder}
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label
              htmlFor="village"
              className="block text-sm font-medium text-gray-700"
            >
              Village
            </label>
            <input
              type="text"
              id="village"
              placeholder={villagePlaceholder}
              value={village}
              onChange={(e) => setVillage(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label
              htmlFor="town"
              className="block text-sm font-medium text-gray-700"
            >
              Town
            </label>
            <input
              type="text"
              id="town"
              placeholder={townPlaceholder}
              value={town}
              onChange={(e) => setTown(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label
              htmlFor="state"
              className="block text-sm font-medium text-gray-700"
            >
              State
            </label>
            <input
              type="text"
              id="state"
              placeholder={statePlaceholder}
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label
              htmlFor="pin"
              className="block text-sm font-medium text-gray-700"
            >
              PINCODE
            </label>
            <input
              type="text"
              id="pin"
              placeholder={pinPlaceholder}
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
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
              placeholder={passwordPlaceholder}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label
              htmlFor="repassword"
              className="block text-sm font-medium text-gray-700"
            >
              Re-enter Password
            </label>
            <input
              type="password"
              id="repassword"
              placeholder={repasswordPlaceholder}
              value={repassword}
              onChange={(e) => setRepassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="acceptConditions"
              checked={acceptConditions}
              onChange={() => setAcceptConditions(!acceptConditions)}
              className="mr-2"
              required
            />
            <label htmlFor="acceptConditions" className="text-sm">
              {acceptConditionsText}
            </label>
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            {buttonText}
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Signup;
