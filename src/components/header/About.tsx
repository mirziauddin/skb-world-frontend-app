import React from "react";
import workImage from "../../assets/homelogo.svg"; // Adjust the path if needed
import companyImage from "../../assets/homelogo.svg"; // Adjust the path if needed

interface DynamicTextProps {
  text: string;
}

const DynamicText: React.FC<DynamicTextProps> = ({ text }) => {
  return <span className="text-green-500">{text}</span>;
};

const About: React.FC = () => {
  const aboutProps = {
    workTitle: "Our Work",
    workDescription:
      "We are dedicated to delivering high-quality software solutions that meet the unique needs of our clients. Our team specializes in developing innovative applications using the latest technologies.",
    companyTitle: "Our Company",
    companyDescription:
      "Our company focuses on using responsive design, React.js, Tailwind CSS, and TypeScript to create efficient and scalable web applications. We strive to stay at the forefront of technology to provide the best possible solutions to our clients.",
  };

  return (
    <div className="w-full min-h-screen p-8 bg-gray-100 flex flex-col items-center justify-center">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          <DynamicText text="About" /> Us
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 w-full max-w-6xl p-4 md:p-8">
        {/* First Part */}
        <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left p-4">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            {aboutProps.workTitle}
          </h2>
          <p className="text-base md:text-lg text-gray-600">
            {aboutProps.workDescription}
          </p>
        </div>
        <div className="flex justify-center items-center p-4">
          <img
            src={workImage}
            alt="Our Work"
            className="w-full h-auto max-w-xs md:max-w-md"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl p-4 md:p-8">
        {/* Second Part */}
        <div className="flex justify-center items-center p-4">
          <img
            src={companyImage}
            alt="Company"
            className="w-full h-auto max-w-xs md:max-w-md"
          />
        </div>
        <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left p-4">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            {aboutProps.companyTitle}
          </h2>
          <p className="text-base md:text-lg text-gray-600">
            {aboutProps.companyDescription}
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
