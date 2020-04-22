module.exports = {
  theme: {
    extend: {
      minHeight: {
        "min-h-80": "80vh",
      },
      fontFamily: {
        display: ["Raleway", "sans-serif"],
        body: ["Raleway", "sans-serif"],
        titles: ["Spartan", "sans-serif"],
      },
    },
  },
  variants: {},
  plugins: [require("@tailwindcss/ui")],
};
