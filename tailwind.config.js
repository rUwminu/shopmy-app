// tailwind.config.js
module.exports = {
  mode: 'jit',
  important: true,
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {},
  variants: {
    extend: {
      animation: ['motion-safe'],
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
}
