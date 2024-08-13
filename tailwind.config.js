/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['"Roboto"', "sans-serif"],
      },
      keyframes: {
        bounce: {
          "0%, 100%": { transform: "translateY(-10%)" },
          "50%": { transform: "translateY(10%)" },
        },
        typing: {
          from: { width: "0" },
          to: { width: "100%" },
        },
        blinkCaret: {
          from: { borderColor: "transparent" },
          to: { borderColor: "transparent" },
          "50%": { borderColor: "#00c853" },
        },
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        fadeInOut: {
          "0%": { opacity: 0 },
          "50%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
        scaleUp: {
          "0%": { transform: "scale(0.8)" },
          "100%": { transform: "scale(1)" },
        },
      },
      animation: {
        bounce: "bounce 4s infinite",
        typing:
          "typing 2s steps(30, end) forwards, blinkCaret 0.75s step-end infinite",
        fadeIn: "fadeIn 0.5s forwards",
        fadeInOut: "fadeInOut 2s infinite",
        scaleUp: "scaleUp 1s ease-in-out",
      },
    },
  },
  plugins: [],
  variants: {
    extend: {
      display: ["focus-group"],
    },
  },
};
