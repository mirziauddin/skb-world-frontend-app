import React from "react";
import aboutUs from "../../assets/aboutUs.svg";
import aboutUs1 from "../../assets/aboutUs1.svg";

interface DynamicTextProps {
  text: string;
}

const DynamicText: React.FC<DynamicTextProps> = ({ text }) => {
  return <span className="text-green-500 font-roboto">{text}</span>;
};

const About: React.FC = () => {
  const workTitle = (
    <>
      <span className="text-green-500 font-roboto">Our </span>
      <span className="text-black font-roboto">Work</span>
    </>
  );

  const companyTitle = (
    <>
      <span className="text-green-500 font-roboto">Our </span>
      <span className="text-black font-roboto">Company</span>
    </>
  );

  const workDescription =
    "We are dedicated to delivering high-quality software solutions that meet the unique needs of our clients. Our team specializes in developing innovative applications using the latest technologies.";
  const companyDescription =
    "Our company focuses on using responsive design, React.js, Tailwind CSS, and TypeScript to create efficient and scalable web applications. We strive to stay at the forefront of technology to provide the best possible solutions to our clients.";

  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center justify-center">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold">
          <DynamicText text="About" /> Us
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl mb-12">
        <div className="flex flex-col justify-center items-start md:items-start text-center md:text-left p-4 rounded-lg">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            {workTitle}
          </h2>
          <p className="text-base md:text-lg text-gray-600 font-roboto">
            {workDescription}
          </p>
        </div>
        <div className="flex justify-center items-center p-4 rounded-lg">
          <img
            src={aboutUs}
            alt="Our Work"
            className="w-full h-100vh object-cover max-w-xs md:max-w-md animate-zoomInOut" // Apply animation here
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl">
        <div className="flex justify-center items-center rounded-lg">
          <img
            src={aboutUs1}
            alt="Company"
            className="w-full h-100vh object-cover max-w-xs md:max-w-md animate-zoomInOut" // Apply animation here
          />
        </div>
        <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left p-4 rounded-lg">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            {companyTitle}
          </h2>
          <p className="text-base md:text-lg text-gray-600 font-roboto">
            {companyDescription}
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
