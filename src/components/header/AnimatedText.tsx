import React from "react";

const AnimatedText: React.FC<{ text: string }> = ({ text }) => {
  return (
    <span className="inline-block">
      {text.split("").map((char, index) => (
        <span
          key={index}
          className="inline-block animate-fadeInOut"
          style={{ animationDelay: `${index * 0.2}s` }}
        >
          {char}
        </span>
      ))}
    </span>
  );
};

export default AnimatedText;
