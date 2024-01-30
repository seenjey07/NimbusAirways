/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  daisyui: {
    styled: true,
    utils: true,
    themes: ["autumn", "luxury"]
    //   {
    //     mytheme: {
    //     "primary": "#00b7ff",
    //     "secondary": "#00e700",
    //     "accent": "#008cff",
    //     "neutral": "#0a0f03",
    //     "base-100": "#281e25",
    //     "info": "#00ffff",
    //     "success": "#82f600",
    //     "warning": "#e67200",
    //     "error": "#ff0048",
    //     },
    //   },
    // ],
  },
    extend: {},
    // eslint-disable-next-line no-undef
   plugins: [require("@tailwindcss/typography"), require("daisyui")],
}

