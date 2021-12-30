// tailwind.config.js
module.exports = {
  purge: [],
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        'stepperWidth': '37.375rem',
        'tableWidth': '1400px',
        'createIssueFormWidth': '600px',
        'createIssueStepperWidth': '750px',
        84: '350px',
        86: '365px'
      },
      boxShadow:{
        'btn': '0px 10px 30px rgb(0 0 0 / 20%)',
      },
      colors: {
        transparent: "transparent",
        current: "currentColor",
        stxblue: {
          light: "#5546ff",
          DEFAULT: "#5546ff",
          dark: "#5546ff",
        },
        darkGray:{          
          light: "#22242C",
          DEFAULT: "#22242C",
          dark: "#22242C",
        },
        lightText:{          
          light: "#C8C8C8",
          DEFAULT: "#C8C8C8",
          dark: "#C8C8C8",
        },
        black: {
          light: "#000",
          DEFAULT: "#000",
          dark: "#000",
        },
        white: {
          light: "#fff",
          DEFAULT: "#fff",
          dark: "#fff",
        },
        lbGray: {
          light: "#8D8D8D",
          DEFAULT: "#8D8D8D",
          dark: "#8D8D8D",
        },
        lbBlack: {
          light: "#1F1F1F",
          DEFAULT: "#1F1F1F",
          dark: "#1F1F1F",
        },
        bgGray: {
          light: "#F8F8F8",
          DEFAULT: "#F8F8F8",
          dark: "#F8F8F8",
        },
        bgBlack: {
          light: "#1D1D1D",
          DEFAULT: "#1D1D1D",
          dark: "#1D1D1D"
        },
        dropdownBGColor: {
          light: "#494951",
          DEFAULT: "#494951",
          dark: "#494951"
        },
        dropdownTextColor: {
          light: "#E3E3E3",
          DEFAULT: "#E3E3E3",
          dark: "#E3E3E3"
        },
        gray: {
          light: "#86888B",
          dark: "#494747"
        },
        activity: "#F8FBFB"
      },
      inset: {
        '18': '4.5rem',
      },
      fontFamily: {
        'open-sauce': ['open sauce one'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("tailwindcss-scrollbar"),
  ],
};
