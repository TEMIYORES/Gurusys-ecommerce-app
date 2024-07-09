/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        orange: "#D17842",
        lightOrange: "#D1784244",
        darkGrey: "#141921",
        grey: "#252A32",
        lightGrey: "#AEAEAE",
      },
    },
  },
  plugins: [],
};
