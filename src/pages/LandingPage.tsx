import React from "react";
import Home from "../components/header/Home";
import AllCourses from "../components/header/AllCourses";
import Service from "../components/header/Service";
import About from "../components/header/About";
import Contact from "../components/header/Contact";

type LandingPageProps = {
  homeRef: React.RefObject<HTMLDivElement>;
  allCoursesRef: React.RefObject<HTMLDivElement>;
  servicesRef: React.RefObject<HTMLDivElement>;
  aboutRef: React.RefObject<HTMLDivElement>;
  contactRef: React.RefObject<HTMLDivElement>;
};

const LandingPage: React.FC<LandingPageProps> = ({
  homeRef,
  allCoursesRef,
  servicesRef,
  aboutRef,
  contactRef,
}) => {
  return (
    <div className="scroll-smooth">
      <div
        ref={homeRef}
        className="flex items-center justify-center w-full min-h-screen p-4"
      >
        <Home />
      </div>
      <div
        ref={allCoursesRef}
        className="flex items-center justify-center w-full min-h-screen p-4"
      >
        <AllCourses />
      </div>
      <div
        ref={servicesRef}
        className="flex items-center justify-center w-full min-h-screen "
      >
        <Service />
      </div>
      <div
        ref={aboutRef}
        className="flex items-center justify-center w-full min-h-screen "
      >
        <About />
      </div>
      <div
        ref={contactRef}
        className="flex items-center justify-center w-full min-h-screen "
      >
        <Contact />
      </div>
    </div>
  );
};

export default LandingPage;
