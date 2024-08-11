import React, { useEffect } from "react";
import skbcompany from "../../assets/skbcompany2.png";
import AnimatedText from "./AnimatedText";
import useHomeStore from "../../middleware/header/useHomeStore";

const Home = () => {
  const { animate, setAnimate } = useHomeStore(); // Use Zustand store

  useEffect(() => {
    setAnimate(true);
  }, [setAnimate]);

  return (
    <>
      <section className="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-4 p-4 md:p-8 lg:p-12">
        {/* Left Side Content */}
        <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left p-4">
          <div
            className={`text-8xl md:text-8xl lg:text-7xl font-bold mb-4 text-black ${
              animate ? "animate-scaleDown" : ""
            }`}
          >
            {homeProps.firstTitle}
            <br />
            <span className="text-green-400">
              <AnimatedText text="software" />
            </span>{" "}
            {homeProps.middleTitle}
          </div>
          <div className="text-sm md:text-base lg:text-lg mb-4 text-black">
            {homeProps.workDescription}
          </div>
          <button className="bg-green-600 text-white py-2 px-4 text-sm rounded hover:bg-green-700">
            {homeProps.button}
          </button>
        </div>

        {/* Right Side SVG Image */}
        <div className="flex justify-center items-center">
          <img
            src={skbcompany}
            alt="Home Logo"
            className="w-32 h-32 md:w-96 md:h-96 lg:w-96 lg:h-96 animate-bounce"
          />
        </div>
      </section>
    </>
  );
};

const homeProps = {
  firstTitle: " We're building",
  middleTitle: " to help",
  workDescription:
    "We are dedicated to delivering high-quality software solutions that meet the unique needs of our clients. Our team specializes in developing innovative applications using the latest technologies.",
  button: "Explore >>",
};

export default Home;
