/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
      fontSize: {
        custom: "1.625rem",
      },
      colors: {
        bg: "#212123",
        dark: "#191919",
        "dark-sea": "#576067",
        grey: "#b8b8b8",
        white: "#fff",
        violet: "#8b57c6",
        "violet-dark": "#6c3eb8",
        light: "#f6f6f7",
        sea: "#616e74",
      },
    },
  },
  plugins: [],
};
