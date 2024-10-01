/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{html,js,ts}", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      keyframes: {
        "slide-right-to-left": {
          "0%": { transform: "translateX(100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        "slide-left-to-right": {
          "0%": { transform: "translateX(0)", opacity: "1" },
          "100%": { transform: "translateX(100%)", opacity: "0" },
        },
      },
      animation: {
        "right-to-left": "slide-right-to-left 0.3s ease-in-out",
        "left-to-right": "slide-left-to-right 0.5s ease-in-out",
      },
      colors: {
        dark: {
          DEFAULT: "#7f7f7f", // Set the default dark color to black
        },
        primary: {
          100: "#ece2f8",
          200: "#d9c5f1",
          300: "#c6a9eb",
          400: "#b38ce4",
          500: "#a06fdd",
          600: "#8059b1",
          700: "#604385",
          800: "#402c58",
          900: "#20162c",
        },
        gray: {
          100: "#e3e3e6",
          200: "#c7c8ce",
          300: "#abacb5",
          400: "#8f919d",
          500: "#737584",
          600: "#5c5e6a",
          700: "#45464f",
          800: "#2e2f35",
          900: "#17171a",
        },
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
