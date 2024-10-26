/** @type {import('tailwindcss').Config} */

const { addDynamicIconSelectors } = require('@iconify/tailwind');

module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./src/*.{html,ts}"
  ],
  theme: {
    extend: {
      screens:{
        '3xl': '1600px',
        '4xl': '1800px'

      }
    },
  },
  plugins: [
    addDynamicIconSelectors(),
  ],
}

