/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#C7D9DD",
        secondary: "#D5E5D5",
        background: "#EEF1DA",
        accent: "#ADB2D4",
        light: "#FAFAFA"
      },
      backgroundImage: {
        accentGrad: "linear-gradient(135deg, #8BC6EC 0%, #9599E2 100%)"
      }
    },
  },
  plugins: [],
}

