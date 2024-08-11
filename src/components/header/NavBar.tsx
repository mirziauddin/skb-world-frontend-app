import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdCloseFullscreen } from "react-icons/md";
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate, useLocation } from "react-router-dom";
import skbcompany from "../../assets/skbcompany.png";
import clsx from "clsx";

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
};

const Navbar: React.FC<NavbarProps> = ({
  homeRef,
  allCoursesRef,
  servicesRef,
  aboutRef,
  contactRef,
}) => {
  const [isSideMenuOpen, setMenu] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);
  const [userRole, setUserRole] = React.useState<string>("");

  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    const authData = localStorage.getItem("authData");
    if (authData) {
      const { role } = JSON.parse(authData);
      setIsLoggedIn(true);
      setUserRole(role);
    } else {
      setIsLoggedIn(false);
    }
  }, [location.pathname]);

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
        { label: "All Courses", ref: allCoursesRef, path: "/" },
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
      if (ref) setTimeout(() => scrollToRef(ref), 100); // Delay to allow navigation before scrolling
    }
    setMenu(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("authData");
    setIsLoggedIn(false);
    setUserRole("");
    navigate("/login");
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-screen bg-white shadow-md z-50 flex justify-between px-8 items-center py-4 lg:px-24">
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
            <button
              key={i}
              className="hidden lg:block text-gray-400 pr-5 hover:text-black"
              onClick={() => handleNavigation(data.path, data.ref)}
            >
              {data.label}
            </button>
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
          {isLoggedIn ? (
            <button
              className="bg-red-600 text-white py-2 px-4 text-center text-sm rounded hover:bg-red-700"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <button
              className="bg-green-600 text-white py-2 px-4 text-center text-sm rounded hover:bg-green-700"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          )}
        </section>
      </nav>
      <div className="pt-16 lg:pt-20"></div>
    </>
  );
};

export default Navbar;
