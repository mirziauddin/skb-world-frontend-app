import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdCloseFullscreen } from "react-icons/md";
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate, useLocation } from "react-router-dom";
import skbcompany from "../../assets/skbcompany.png";
import clsx from "clsx";
import useAuthStore from "../../middleware/header/useAuthStore";

type NavbarProps = {
  homeRef: React.RefObject<HTMLDivElement>;
  allCoursesRef: React.RefObject<HTMLDivElement>;
  servicesRef: React.RefObject<HTMLDivElement>;
  aboutRef: React.RefObject<HTMLDivElement>;
  contactRef: React.RefObject<HTMLDivElement>;
};

type NavLink = {
  label: string;
  path: string;
  ref?: React.RefObject<HTMLDivElement>;
  dropdownOptions?: { label: string; path: string }[];
};

const Navbar: React.FC<NavbarProps> = ({
  homeRef,
  allCoursesRef,
  servicesRef,
  aboutRef,
  contactRef,
}) => {
  const [isSideMenuOpen, setMenu] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const { isLoggedIn, userRole, setAuth, clearAuth } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    const authData = localStorage.getItem("authData");
    if (authData) {
      const { role } = JSON.parse(authData);
      setAuth(true, role);
    } else {
      setAuth(false, "");
    }
  }, [location.pathname, setAuth]);

  const scrollToRef = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navlinks: NavLink[] = isLoggedIn
    ? userRole === "ADMIN"
      ? [
          { label: "Dashboard", path: "/adminDashboard" },
          { label: "Manage Users", path: "/manageUsers" },
          { label: "Profile", path: "/profile" },
        ]
      : [
          { label: "Dashboard", path: "/userDashboard" },
          { label: "My Courses", path: "/myCourses" },
          { label: "Profile", path: "/profile" },
        ]
    : [
        { label: "Home", ref: homeRef, path: "/" },
        {
          label: "All Courses",
          ref: allCoursesRef,
          path: "/",
          dropdownOptions: [
            { label: "Recent Courses", path: "/allCourses" },
            { label: "All Courses", path: "/publicAllCourses" },
          ],
        },
        { label: "Services", ref: servicesRef, path: "/" },
        { label: "About", ref: aboutRef, path: "/" },
        { label: "Contact", ref: contactRef, path: "/" },
      ];

  const handleNavigation = (
    path: string,
    ref?: React.RefObject<HTMLDivElement>
  ) => {
    if (location.pathname === path) {
      if (ref) scrollToRef(ref);
    } else {
      navigate(path);
      if (ref) setTimeout(() => scrollToRef(ref), 100);
    }
    setMenu(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("authData");
    clearAuth();
    navigate("/login");
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full h-14 bg-white shadow-md z-50 flex justify-between px-8 items-center py-4 lg:px-24">
        <div className="flex items-center gap-8">
          <section className="flex items-center gap-4">
            <GiHamburgerMenu
              onClick={() => setMenu(true)}
              className="text-3xl cursor-pointer lg:hidden"
            />
            <img
              src={skbcompany}
              alt="Company Logo"
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
                onClick={() => handleNavigation(data.path, data.ref)}
              >
                {data.label}
              </button>
            ))}
            {isLoggedIn && (
              <button className="font-bold text-2xl" onClick={handleLogout}>
                Logout
              </button>
            )}
          </section>
        </div>

        {/* Navigation Links for larger screens */}
        <section className="flex items-center gap-4">
          {navlinks.map((data, i) => (
            <div
              key={i}
              className="relative hidden lg:block text-gray-400 pr-5 hover:text-black"
              onMouseEnter={() => data.dropdownOptions && setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button
                className="text-gray-400 hover:text-black"
                onClick={() => handleNavigation(data.path, data.ref)}
              >
                {data.label}
              </button>
              {data.dropdownOptions && isDropdownOpen && (
                <div className="absolute top-full left-0 bg-white shadow-lg py-2 z-50">
                  {data.dropdownOptions.map((option, j) => (
                    <button
                      key={j}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-200 w-full text-left"
                      onClick={() => handleNavigation(option.path)}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
          {/* Search Input */}
          {!isLoggedIn && (
            <div className="hidden lg:flex items-center">
              <input
                type="text"
                placeholder="Search..."
                className="border rounded-l-full py-1 px-3"
              />
              <button className="bg-green-600 text-white py-1 px-2 rounded-r-full">
                <AiOutlineSearch className="text-xl" />
              </button>
            </div>
          )}

          {/* Login/Logout Button */}
          <button
            className={`py-2 px-4 text-center text-sm rounded ${
              isLoggedIn
                ? "bg-red-600 hover:bg-red-700 text-white"
                : "bg-green-600 hover:bg-green-700 text-white"
            }`}
            onClick={() => {
              if (isLoggedIn) {
                handleLogout();
              } else {
                navigate("/login");
              }
            }}
          >
            {isLoggedIn ? "Logout" : "Login"}
          </button>
        </section>
      </nav>
      <div className="pt-16 lg:pt-20"></div>
    </>
  );
};

export default Navbar;
