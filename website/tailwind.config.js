/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html"],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: "#1B1F5E", light: "#252A72", dark: "#12143F" },
        royal: { DEFAULT: "#2B4FA3", light: "#3562C0", dark: "#1E3A7A" },
        accent: { DEFAULT: "#C42127", light: "#E02D33", dark: "#9B1B20" },
        silver: { DEFAULT: "#C0C0C0", light: "#E8E8E8", dark: "#8A8A8A" },
      },
      fontFamily: {
        display: ["Playfair Display", "serif"],
        body: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
