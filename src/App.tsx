import { useRef } from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Navbar from "./components/header/NavBar";
import About from "./components/header/About";
import Contact from "./components/header/Contact";
import AllCourses from "./components/header/AllCourses";
import Service from "./components/header/Service";
import Login from "./components/Resgiter/Login";
import Signup from "./components/Resgiter/Signup";
import { Footer, footerSections } from "./components/header/Footer";
import ResetPassword from "./components/Resgiter/ResetPassword";
import ForgotPassword from "./components/Resgiter/ForgotPassword";
import UserDashboard from "./pages/userDashboard";

import AdminDashboard from "./pages/AdminDashboard";
import Home from "./components/header/Home";
import AdminCatagory from "./components/admindashboard/AdminCatagory";
import AdminSubCategory from "./components/admindashboard/AdminSubCategory";
import AdminAllUsers from "./components/admindashboard/AdminAllUsers";

export default function App() {
  // Create references for each section
  const homeRef = useRef<HTMLDivElement>(null);
  const allCoursesRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <Navbar
        homeRef={homeRef}
        allCoursesRef={allCoursesRef}
        servicesRef={servicesRef}
        aboutRef={aboutRef}
        contactRef={contactRef}
      />
      <Routes>
        <Route
          path="/"
          element={
            <LandingPage
              homeRef={homeRef}
              allCoursesRef={allCoursesRef}
              servicesRef={servicesRef}
              aboutRef={aboutRef}
              contactRef={contactRef}
            />
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/home" element={<Home />} />
        <Route path="/allcourses" element={<AllCourses />} />
        <Route path="/services" element={<Service />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        //admin panel
        <Route path="/adminDashboard" element={<AdminDashboard />} />
        <Route path="/adminCategory" element={<AdminCatagory />} />
        <Route path="/adminSubCategory" element={<AdminSubCategory />} />
        <Route path="/adminAllUsers" element={<AdminAllUsers />} />
        <Route path="/userDashboard" element={<UserDashboard />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
        //admin home
      </Routes>
      <Footer sections={footerSections} />
    </>
  );
}
