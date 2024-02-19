import scrollbar from "tailwind-scrollbar";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        "3xl": "1600px",
        "4xl": "1728px",
        "5xl": "1920px",
        "6xl": "2560px",
        "7xl": "3840px",
      },
      colors: {
        main: "rgb(255, 255, 255)",
        "location-details": "rgba(255, 255, 255, 0.80)",
      },
      backgroundImage: {
        main: "linear-gradient(rgba(30, 27, 75, 0.25), rgba(30, 27, 75, 0.25)), url(/images/main-bg.jpg)",
      },
    },
  },
  plugins: [scrollbar],
};
