import React from "react";
import workImage from "../../assets/homelogo.svg";

interface ServiceProps {
  title: string;
  description: string;
  whyChooseUsTitle: string;
  points: string[];
  additionalInfo: string;
}

const Service: React.FC = () => {
  const serviceProps: ServiceProps = {
    title: "Our Services",
    description:
      "At SKB|WORLD, we specialize in providing comprehensive courses for all aspects of computer hardware. Whether you're looking to learn about laptop and desktop BIOS or other essential hardware skills, we have you covered.",
    whyChooseUsTitle: "Why Choose Us?",
    points: [
      "In-depth BIOS training for laptops and desktops",
      "Expert-led courses on various computer hardware components",
      "Comprehensive and up-to-date content",
      "Flexible learning options to fit your schedule",
      "Practical hands-on experience with real-world scenarios",
    ],
    additionalInfo:
      "Get in touch with us to find out more about our courses and how we can help you achieve your hardware training goals.",
  };

  return (
    <div className="w-full min-h-screen p-8 bg-gray-100 flex flex-col items-center justify-center">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          {serviceProps.title}
        </h1>
        <p className="text-base md:text-lg text-gray-600">
          {serviceProps.description}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl p-4 md:p-8">
        {/* Service Description */}
        <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left p-4">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            {serviceProps.whyChooseUsTitle}
          </h2>
          <p className="text-base md:text-lg text-gray-600 mb-4">
            At SKB|WORLD, we offer:
          </p>
          <ul className="list-disc list-inside text-gray-600">
            {serviceProps.points.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
        {/* Image or Visual Representation */}
        <div className="flex justify-center items-center p-4">
          <img
            src={workImage} // Replace with actual image path
            alt="Service Representation"
            className="w-full h-auto max-w-xs md:max-w-md"
          />
        </div>
      </div>
      <div className="text-center mt-8">
        <p className="text-base md:text-lg text-gray-600">
          {serviceProps.additionalInfo}
        </p>
      </div>
    </div>
  );
};

export default Service;
