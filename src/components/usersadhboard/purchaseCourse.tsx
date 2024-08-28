import { useState } from "react";
import UserSideBar from "./UserSideBar";
import UserNavbar from "./UserNavbar";
import useAuth from "../../hooks/useAuth";
import React from "react";
import { Button } from "@mui/material";

type Props = {};

export default function PurchaseCourse({}: Props) {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const { user, isUserLoading } = useAuth();
  const userId = user?.id ?? ""; // Provide a fallback value
  console.log(isUserLoading);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <div className="flex">
      <UserSideBar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />
      <div
        className={`flex-1 transition-all duration-300 ${
          openSidebarToggle ? "ml-64" : "ml-0"
        }`}
      >
        <UserNavbar OpenSidebar={OpenSidebar} userId={userId} />
        <div>
          {/* Hero Section */}
          <section className="bg-pink-100 p-10">
            <nav className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">SoftSpring</h1>
              <div className="space-x-4">
                <Button variant="text" className="text-gray-700">
                  Home
                </Button>
                <Button variant="text" className="text-gray-700">
                  About
                </Button>
                <Button variant="text" className="text-gray-700">
                  Services
                </Button>
                <Button variant="text" className="text-gray-700">
                  Contact
                </Button>
                <Button variant="contained" className="bg-blue-500 text-white">
                  Get a Quote
                </Button>
              </div>
            </nav>

            <div className="flex justify-between items-center mt-10">
              <div>
                <h2 className="text-5xl font-bold">Software Development</h2>
                <p className="mt-4 text-lg text-gray-700">
                  At our service-based software company, we offer a wide range
                  of innovative software solutions to cater to your business
                  needs.
                </p>
                <div className="mt-8 space-x-4">
                  <Button variant="contained" className="bg-black text-white">
                    Get a Quote
                  </Button>
                  <Button variant="outlined" className="text-gray-700">
                    Contact Us
                  </Button>
                </div>
              </div>

              <div className="flex space-x-4">
                <img
                  src="/path/to/mobile-image.png"
                  alt="Mobile App"
                  className="w-32"
                />
                <img
                  src="/path/to/laptop-image.png"
                  alt="Laptop App"
                  className="w-64"
                />
              </div>
            </div>

            <div className="flex justify-center space-x-8 mt-10">
              <img src="/path/to/shell-logo.png" alt="Shell" className="h-12" />
              <img
                src="/path/to/ferrari-logo.png"
                alt="Ferrari"
                className="h-12"
              />
            </div>
          </section>

          {/* Seamless Software Section */}
          <section className="bg-black text-white p-10">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-4xl font-bold">Seamless Software</h2>
                <p className="mt-4 text-lg">
                  Our team of skilled developers and designers collaborate
                  closely with you to understand your requirements and deliver
                  tailored solutions.
                </p>
                <Button variant="text" className="text-blue-500 mt-4">
                  Let's Get Started
                </Button>
              </div>

              <div className="flex space-x-4">
                <img
                  src="/path/to/software-image.png"
                  alt="Software Screenshot"
                  className="w-64"
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
