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
        className="flex items-center justify-center w-full min-h-screen px-4 mx-4 border-l-8 border-r-8 border-gray-300" // Added left and right borders
      >
        <Home />
      </div>
      <div
        ref={allCoursesRef}
        className="flex items-center justify-center w-full min-h-screen px-4 mx-4 border-l-8 border-r-8 border-gray-300" // Added left and right borders
      >
        <AllCourses />
      </div>
      <div
        ref={servicesRef}
        className="flex items-center justify-center w-full min-h-screen px-4 mx-4 border-l-8 border-r-8 border-gray-300" // Added left and right borders
      >
        <Service />
      </div>
      <div
        ref={aboutRef}
        className="flex items-center justify-center w-full min-h-screen px-4 mx-4 border-l-8 border-r-8 border-gray-300" // Added left and right borders
      >
        <About />
      </div>
      <div
        ref={contactRef}
        className="flex items-center justify-center w-full min-h-screen px-4 mx-4 border-l-8 border-r-8 border-gray-300" // Added left and right borders
      >
        <Contact />
      </div>
    </div>
  );
};

export default LandingPage;

// import React from "react";
// import Home from "../components/header/Home";
// import AllCourses from "../components/header/AllCourses";
// import Service from "../components/header/Service";
// import About from "../components/header/About";
// import Contact from "../components/header/Contact";

// type LandingPageProps = {
//   homeRef: React.RefObject<HTMLDivElement>;
//   allCoursesRef: React.RefObject<HTMLDivElement>;
//   servicesRef: React.RefObject<HTMLDivElement>;
//   aboutRef: React.RefObject<HTMLDivElement>;
//   contactRef: React.RefObject<HTMLDivElement>;
// };

// const LandingPage: React.FC<LandingPageProps> = ({
//   homeRef,
//   allCoursesRef,
//   servicesRef,
//   aboutRef,
//   contactRef,
// }) => {
//   return (
//     <div className="grid grid-cols-12 gap-4">
//       {/* Left ads column with decreased width */}
//       <div className="hidden lg:block col-span-1 bg-gray-100 p-4">
//         <div className="ad-content">
//           <p>Ad Space 1</p>
//           <p>Ad Space 2</p>
//         </div>
//       </div>

//       {/* Main content column */}
//       <div className="col-span-12 lg:col-span-10">
//         <div className="scroll-smooth">
//           <div
//             ref={homeRef}
//             className="flex items-center justify-center w-full min-h-screen p-4"
//           >
//             <Home />
//           </div>
//           <div
//             ref={allCoursesRef}
//             className="flex items-center justify-center w-full min-h-screen p-4"
//           >
//             <AllCourses />
//           </div>
//           <div
//             ref={servicesRef}
//             className="flex items-center justify-center w-full min-h-screen p-4"
//           >
//             <Service />
//           </div>
//           <div
//             ref={aboutRef}
//             className="flex items-center justify-center w-full min-h-screen p-4"
//           >
//             <About />
//           </div>
//           <div
//             ref={contactRef}
//             className="flex items-center justify-center w-full min-h-screen p-4"
//           >
//             <Contact />
//           </div>
//         </div>
//       </div>

//       {/* Right ads column with decreased width */}
//       <div className="hidden lg:block col-span-1 bg-gray-100 p-4">
//         <div className="ad-content">
//           <p>Ad Space 3</p>
//           <p>Ad Space 4</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LandingPage;
