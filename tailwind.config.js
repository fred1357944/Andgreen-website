module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "soft-gray": "#f5f5f5",
        "light-green": "#e0f7e9",
        "dark-gray": "#4d4d4d",
        "primary-green": "#d6e9d7",
        "hover-green": "#c4d9c7",
      },
      fontFamily: {
        futura: ["Futura", "sans-serif"],
        "shin-gothic": ["UDShinGothic", "sans-serif"],
        "futura-bt": ["Futura BT", "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 8px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/forms"), // 確保這行存在
  ],
};
