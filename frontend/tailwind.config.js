/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
  animation: {
    "fade-in": "fadeIn 0.5s ease-in-out",
    "fade-in-down": "fadeInDown 0.5s ease-in-out",
    "fade-in-up": "fadeInUp 0.5s ease-in-out",
  },
  keyframes: {
    fadeIn: {
      "0%": { opacity: "0" },
      "100%": { opacity: "1" },
    },
    fadeInDown: {
      "0%": { opacity: "0", transform: "translateY(-10px)" },
      "100%": { opacity: "1", transform: "translateY(0)" },
    },
    fadeInUp: {
      "0%": { opacity: "0", transform: "translateY(10px)" },
      "100%": { opacity: "1", transform: "translateY(0)" },
    },
  },
};
