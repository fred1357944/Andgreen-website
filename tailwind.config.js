module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "light-gray": "#d3d3d3", // For headings
      },
      fontFamily: {
        futura: ["Futura BT", "sans-serif"],
        morisawa: ["UD Shin Gothic", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
};
