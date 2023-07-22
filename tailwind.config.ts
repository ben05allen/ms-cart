/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.html", "./src/**/*.{vue,html,js,ts,jsx,tsx}"],
  theme: {
    letterSpacing: {
      widest: "0.4em",
    },
    extend: {
      colors: {
        primary: "#00668A",
        secondary: "##EEE8AA",
      },
    },
    fontFamily: {
      Roboto: ["Roboto, sans-serif"],
      Plus: ["'Plus Jakarta Sans', sans-serif"],
    },

    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
  },
  plugins: [],
};
