/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
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
          "50%": { borderColor: "#00c853" }, // Tailwind green-400 color
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
      },
      animation: {
        bounce: "bounce 4s infinite",
        typing:
          "typing 2s steps(30, end) forwards, blinkCaret 0.75s step-end infinite",
        fadeIn: "fadeIn 0.5s forwards",
        fadeInOut: "fadeInOut 2s infinite",
      },
    },
  },
  plugins: [],
};
