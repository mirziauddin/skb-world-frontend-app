import React, { useRef } from "react";
import { Route, Routes } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Navbar from "./components/header/NavBar";
import About from "./components/header/About";
import Contact from "./components/header/Contact";
import Home from "./components/header/Home";
import AllCourses from "./components/header/AllCourses";
import Service from "./components/header/Service";
import Login from "./components/Resgiter/Login";
import Signup from "./components/Resgiter/Signup";
import { Footer, footerSections } from "./components/header/Footer";
import ResetPassword from "./components/Resgiter/ResetPassword";
import ForgotPassword from "./components/Resgiter/ForgotPassword";
import UserDashboard from "./pages/userDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import MiniDrawer from "./components/admindashboard/sideNavbar";

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
        <Route path="/adminDashboard" element={<AdminDashboard />} />
        <Route path="/userDashboard" element={<UserDashboard />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
        <Route path="/sidenavbar" element={<MiniDrawer />} />
      </Routes>
      <Footer sections={footerSections} />
    </>
  );
}
