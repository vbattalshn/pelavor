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
        "listBgImage": "url('https://files.pelavor.com/bg-image.png')",
        "sectionBgImage": "url('https://files.pelavor.com/section-image.png')",
        "goldBg": "linear-gradient(45deg, #FFD700, #FFDF00, #F9A602, #FFEF8B)",
        "silverBg": "linear-gradient(45deg, #C0C0C0, #D8D8D8, #F5F5F5, #BEBEBE)",
        "bronzeBg": "linear-gradient(45deg, #CD7F32, #B87333, #A97142, #D6A569)"
        },

      minHeight: {
        "dashboardContent":"calc(100vh - 16px)"
      },
      gridTemplateColumns: {
        'auto-fit': 'repeat(auto-fit, minmax(270px, 1fr))',
        'auto-user-tags': 'repeat(auto-fit, minmax(1fr, 1fr))',
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
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'gold': '#d4af37',
        'silver': '#A9A9A9',
        'bronze': '#c47f32',
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant("hocus", ["&:hover", "&:focus"]);
    }),
  ],
};


