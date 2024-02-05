/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  daisyui: {
    styled: true,
    utils: true,
    themes: [
      {
        mytheme: {
          primary: "#d97706",
          secondary: "#facc15",
          accent: "#1c1917",
          neutral: "#99f6e4",
          "base-100": "#fde68a",
          info: "#fde047",
          success: "#00ffff",
          warning: "#fb923c",
          error: "#ef4444",
        },
      },
    ],
  },

  extend: {},
  // eslint-disable-next-line no-undef
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
