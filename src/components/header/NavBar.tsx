import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdCloseFullscreen } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import skbcompany from "../../assets/skbcompany.png";
import clsx from "clsx";

type NavbarProps = {
  homeRef: React.RefObject<HTMLDivElement>;
  allCoursesRef: React.RefObject<HTMLDivElement>;
  servicesRef: React.RefObject<HTMLDivElement>;
  aboutRef: React.RefObject<HTMLDivElement>;
  contactRef: React.RefObject<HTMLDivElement>;
};

const Navbar: React.FC<NavbarProps> = ({
  homeRef,
  allCoursesRef,
  servicesRef,
  aboutRef,
  contactRef,
}) => {
  const [isSideMenuOpen, setMenu] = React.useState(false);
  const navigate = useNavigate(); // Hook for navigation

  const scrollToRef = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navlinks = [
    { label: "Home", ref: homeRef },
    { label: "All Courses", ref: allCoursesRef },
    { label: "Services", ref: servicesRef },
    { label: "About", ref: aboutRef },
    { label: "Contact", ref: contactRef },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50 flex justify-between px-8 items-center py-4 lg:px-24">
        <div className="flex items-center gap-8">
          <section className="flex items-center gap-4">
            <GiHamburgerMenu
              onClick={() => setMenu(true)}
              className="text-3xl cursor-pointer lg:hidden"
            />
            <img
              src={skbcompany}
              alt="Our Work"
              className="w-full h-full max-w-60 md:max-w-60"
            />
          </section>
        </div>

        {/* Sidebar mobile menu */}
        <div
          className={clsx(
            "fixed h-full w-screen lg:hidden bg-black/50 backdrop-blur-sm top-0 left-0 transform -translate-x-full transition-transform duration-300 ease-in-out",
            isSideMenuOpen && "translate-x-0"
          )}
        >
          <section className="text-black bg-white flex-col absolute top-0 left-0 h-full w-full p-8 gap-8 z-50 flex">
            <MdCloseFullscreen
              onClick={() => setMenu(false)}
              className="text-3xl cursor-pointer mb-8 self-end"
            />
            {navlinks.map((data, i) => (
              <button
                key={i}
                className="font-bold text-2xl"
                onClick={() => {
                  scrollToRef(data.ref);
                  setMenu(false);
                }}
              >
                {data.label}
              </button>
            ))}
          </section>
        </div>

        {/* Navigation Links for larger screens */}
        <section className="flex items-center gap-4">
          {navlinks.map((data, i) => (
            <button
              key={i}
              className="hidden lg:block text-gray-400 pr-5 hover:text-black"
              onClick={() => scrollToRef(data.ref)}
            >
              {data.label}
            </button>
          ))}
          <button
            className="bg-green-600 text-white py-2 px-4 text-center text-sm rounded hover:bg-green-700"
            onClick={() => navigate("/login")} // Handle navigation to login page
          >
            Login
          </button>
        </section>
      </nav>
      {/* Add some space below the fixed navbar */}
      <div className="pt-16 lg:pt-20"></div>
    </>
  );
};

export default Navbar;
