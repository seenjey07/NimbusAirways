/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  daisyui: {
    styled: true, 
    utils: true,
    themes: ["autumn", "luxury"],
  },
    extend: {},
    // eslint-disable-next-line no-undef
    plugins: [require("@tailwindcss/typography"), require("daisyui")],
}
