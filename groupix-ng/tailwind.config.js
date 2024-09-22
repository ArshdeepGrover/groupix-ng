/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{html,js,ts}", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: "#000000", // Set the default dark color to black
        },
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
