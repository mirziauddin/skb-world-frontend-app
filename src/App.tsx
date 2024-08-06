import React, { useRef } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/header/NavBar";
import About from "./components/header/About";

import Contact from "./components/header/Contact";
import Home from "./components/header/Home";
import AllCourses from "./components/header/AllCourses";
import Service from "./components/header/Service";
import LandingPage from "./pages/LandingPage";

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
        <Route path="/service" element={<Service />} />
      </Routes>
    </>
  );
}
