const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./styles/components/**/*.scss"
  ],
  theme: {
    extend: {
      colors: {
        "eerie-black": "#252627",
        isabelline: "#F2EDEB",
        "medium-state-blue": "#7D83FF",
        "fiery-rose": "#F05365",
        mango: "#FABC2A",
      },
      screens: {
        "min-hd": {
          raw: "(min-aspect-ratio: 16/9)",
        },
        "max-hd": {
          raw: "(max-aspect-ratio: 16/9)",
        },
      },
    },
  },
  plugins: [],
};
