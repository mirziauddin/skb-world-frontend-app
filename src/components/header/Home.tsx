import React from "react";
import homeLogo from "../../assets/homelogo.svg";
import AnimatedText from "./AnimatedText";

export default function Home() {
  return (
    <section className="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-4 p-4 md:p-8 lg:p-12">
      {/* Left Side Content */}
      <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left p-4">
        <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-black">
          We're building <br />
          <span className="text-green-400">
            <AnimatedText text="software" />
          </span>{" "}
          to help
        </div>
        <div className="text-sm md:text-base lg:text-lg mb-4 text-black">
          Content first big letter then small letter Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Tempora incidunt odit eius saepe
        </div>
        <button className="bg-green-600 text-white py-2 px-4 text-sm rounded hover:bg-green-700">
          Get Started
        </button>
      </div>

      {/* Right Side SVG Image */}
      <div className="flex justify-center items-center">
        <img
          src={homeLogo}
          alt="Home Logo"
          className="w-32 h-32 md:w-96 md:h-96 lg:w-96 lg:h-96 animate-bounce"
        />
      </div>
    </section>
  );
}
