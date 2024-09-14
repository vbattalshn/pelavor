/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "notFoundImage": "url('https://images.pexels.com/photos/3368246/pexels-photo-3368246.jpeg')",
        "mainImage": "url('https://files.pelavor.com/main_bg.svg')",
        "listBgImage": "url('https://api.pelavor.com/assets/bg-image.png')",
        "sectionBgImage": "url('https://api.pelavor.com/assets/section-image.png')"
        },
      minHeight: {
        "dashboardContent":"calc(100vh - 16px)"
      },
      gridTemplateColumns: {
        'auto-fit': 'repeat(auto-fit, minmax(270px, 1fr))',
      },
      keyframes: {
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "10%, 50%, 90%": { transform: "translateX(-5px)" },
          "30%, 70%": { transform: "translateX(5px)" },
        },
        loaded: {
          "0%": { transform: "translateY(-5px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "100%" },
        },
      },
      animation: {
        shake: "shake 0.5s ease-in-out",
        loaded: "loaded 0.25s ease",
      },
      letterSpacing: {
        widest: '.25em',
      },
      height: {
        'content': 'calc(100vh - 60px)',
      }
  
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant("hocus", ["&:hover", "&:focus"]);
    }),
  ],
};


